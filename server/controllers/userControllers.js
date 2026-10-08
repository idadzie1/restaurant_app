const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const HttpError = require("../models/errorModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { v2: cloudinary } = require("cloudinary");
const { getCloudinaryPublicId } = require("../utils/cloudinaryUtils");

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

        const { _id: id, firstName, role, profilePic } = findUser;

        const token = jwt.sign({ id, firstName, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ token, id, firstName, role, profilePic });

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

// =============== Saving profile photo in Cloudinary ========================================
// ===========================================================================================

const changeAvatar = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            return next(
                new HttpError("Unauthorized. Not logged in", 401)
            );
        }

        const currentUserId = req.user.id;

        const user = await User.findById(currentUserId);

        if (!user) {
            return next(
                new HttpError("User not found", 404)
            );
        }

        if (!req.files || !req.files.profilePic) {
            return next(
                new HttpError("Select an image", 422)
            );
        }

        const { profilePic } = req.files;

        if (profilePic.size > 200000) {
            return next(
                new HttpError(
                    "Image size must not be more than 200kB",
                    422
                )
            );
        }

        // Keep the old Cloudinary URL before replacing it
        const oldProfilePicUrl = user.profilePic;

        // Upload new profile photo
        const result = await cloudinary.uploader.upload(
            `data:${profilePic.mimetype};base64,${profilePic.data.toString("base64")}`,
            {
                folder: `restaurant-app/users/${currentUserId}/profile`
            }
        );

        const url = result.secure_url;

        if (!url) {
            return next(
                new HttpError(
                    "Could not upload the profile photo. Try again later",
                    422
                )
            );
        }

        // Update user's profile photo in MongoDB
        const updatedUser = await User.findByIdAndUpdate(
            currentUserId,
            { profilePic: url },
            { returnDocument: 'after' }
        );

        if (!updatedUser) {
            return next(
                new HttpError(
                    "Could not save photo into database",
                    422
                )
            );
        }

        // Delete old photo from Cloudinary
        if (oldProfilePicUrl) {
            const oldPublicId =
                getCloudinaryPublicId(oldProfilePicUrl);

            if (oldPublicId) {
                await cloudinary.uploader.destroy(oldPublicId);
            }
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        return next(new HttpError(error.message));
    }
};


// ====================================================================================================================================================================================

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


// ===============================Change Password========================================

const changePassword = async (req, res, next)=>{
    try {        
        // find current User
        const loggedInUser = await User.findById(req.user.id)
        if(!loggedInUser){
            return next(new HttpError("User does not exist", 422))
        }
        
        const { currentPassword, newPassword, cfmNewPassword } = req.body;

        if(!currentPassword || !newPassword || !cfmNewPassword){
            return next(new HttpError("Fill in all the fields", 422))
        }

                // check current password if it's correct
        const passwordMatches = await bcrypt.compare(currentPassword, loggedInUser.password );

        if (!passwordMatches) {
            return next( new HttpError("Current password does not match", 422));
        }

        if ((newPassword.trim()).length < 8) {
            return next(new HttpError("New password must be at least 8 characters long", 422))
        }

        if (newPassword != cfmNewPassword) {
            return next(new HttpError("Passwords do not match", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(newPassword, salt)

        const updatedUser = await User.findByIdAndUpdate(req.user.id, {password:hashedPass})
        if(!updatedUser){
            return next(new HttpError("Password Change unsuccessful", 422))
        }

        res.status(200).json({message: "Password Change successful"})        
                        
    } catch (error) {
        return next(new HttpError(error.message))
    }

}

module.exports = { registerUser, loginUser, getUser, changeAvatar, editUser, allUsers, changePassword }