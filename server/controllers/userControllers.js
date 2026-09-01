const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const HttpError = require("../models/errorModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

// ========= Register new user ============
// POST: api/users/register
// unprotected

const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, telephone, password, cfmpassword } = req.body;
        if (!firstName || !lastName || !email || !telephone || !password) {
            return next(new HttpError("Fill in all fields", 422))
        }

        //use regex to validate email later
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next(new HttpError("Invalid email", 422))
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({ email: newEmail })

        if (emailExists) {
            return next(new HttpError("User already exists", 422))
        }

        // use regex to validate phone number later match: [/^(\+233|0)\d{9}$/, 'Invalid phone number']
        if (!(/^(\+233|0)\d{9}$/.test(telephone))) {
            return next(new HttpError("Invalid phone number", 422))
        }


        if ((password.trim()).length < 8) {
            return next(new HttpError("Password must be at least 8 characters long", 422))
        }

        if (password != cfmpassword) {
            return next(new HttpError("Passwords do not match", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = await User.create({ firstName, lastName, email: newEmail, telephone, password: hashedPass })
        res.status(201).json(`new user ${newUser.email} and name ${newUser.firstName} registered`)


    } catch (error) {
        return next(new HttpError(error.message, 422))
    }
}

// ======== Login a registered user=====================
// POST: api/users/login
// uprotected
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new HttpError("Fill in all fields", 422));
        }

        const lowerCaseEmail = email.toLowerCase();

        const findUser = await User.findOne({ email: lowerCaseEmail });
        if (!findUser) {
            return next(new HttpError("You are not registered", 422));
        }

        const comparePass = await bcrypt.compare(password, findUser.password);
        if (!comparePass) {
            return next(new HttpError("Invalid Password", 422));
        }

        const { _id: id, firstName, role } = findUser;

        const token = jwt.sign({ id, firstName, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ token, id, firstName, role });

    } catch (error) {
        return next(new HttpError("Unable to log you in. It could be newtwork related issues. Try again later", 422))
    }
}

// ========= User profile ============================
// POST: api/users/:id
// protected
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params

        const findUser = await User.findById(id).select(`-password`);
        if (!findUser) {
            return next(new HttpError("Not found", 404))
        }
        res.status(200).json(findUser)

    } catch (error) {
        return next(new HttpError(error.message))
    }

}

// ========== change user avatat ===========
// POST: api/users/:id
// potected
const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files.profilePic) {
            return next(new HttpError("Please choose photo", 422));
        }

        // action is preotected and needs authorization to ensure it's the currect logged in user to proceed. Current looged in user is req.user.id;
        // find user

        const findUser = await User.findById(req.user.id)
        // delete old avatar if it exists
        if (findUser.profilePic) {
            fs.unlink(path.join(__dirname, '..', 'uploads', findUser.profilePic), err => {
                if (err) {
                    return next(new HttpError(err))
                }
            })
        }

        const { profilePic } = req.files;
        if (profilePic.size > 500000) {
            return next(new HttpError("File size should be less than 500KB", 422));
        }

        let fileName;
        fileName = profilePic.name;
        let splittedFileName = fileName.split('.');
        let newFileName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1]
        profilePic.mv(path.join(__dirname, "..", "/uploads", newFileName), async (err) => {
            if (err) {
                return next(new HttpError(err))
            }
            // reserved space here
            const updatedProfilePic = await User.findByIdAndUpdate(req.user.id, { profilePic: newFileName }, { returnDocument: 'after' })

            if (!updatedProfilePic) {
                return next(new HttpError("Could not change profilePic", 422))
            }
            res.status(200).json(updatedProfilePic)
        })

        // ==== marked to be moved up there for reserved space
        // ====

    } catch (error) {
        return next(new HttpError(error.message));
    }
}

// ============edit user deatails==============
// Patch api/users/:id
// protected
const editUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, currentPassword, newPassword, cfmNewPassword } = req.body;
        if (!firstName || !lastName || !email || !currentPassword || !newPassword || !cfmNewPassword) {
            return next(new HttpError("Fill in all fields", 422))
        }

        // find the logged in user from the databse        
        const loggedInUser = await User.findById(req.user.id);

        // Make sure the new email does not exist
        if (loggedInUser.email && (loggedInUser._id != req.user.id)) {
            return next(new HttpError("Email already exists", 422))
        }

        // compare current password with password in db
        const validatePassword = await bcrypt.compare(currentPassword, loggedInUser.password);
        if(!validatePassword){
            return next(new HttpError("Invalid Password", 422))
        }

        // compare new passwords
        if(newPassword !== cfmNewPassword){
            return next(new HttpError("Your passwords do not match", 422))
        }

        // hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // update info in the databse
        const newInfo = await User.findByIdAndUpdate(req.user.id, {firstName, lastName, email, password: hashedPassword}, {returnDocument:'after'})

        res.status(200).json(newInfo);


    } catch (error) {
        return next(new HttpError(error.message));
    }
}

// ==============Get all users=========
// GET api/users
// unprotected
const allUsers = async (req, res, next) => {
    try {
        const users = await User.find().select(`-password`)
        res.status(200).json(users)
    } catch (error) {
        return next(new HttpError(error.message))
    }
}

module.exports = { registerUser, loginUser, getUser, changeAvatar, editUser, allUsers }