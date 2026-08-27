const{Schema, model} = require('mongoose')


const userSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    profilePic:{type: String},
    telephone: {type: String, required: true},
    password:{type: String, required: true},
    agree:{type: Boolean, required: true},
    role:{type:String, default:"user", required: true}

})

module.exports = model('User', userSchema)