    
const {Schema, model} = require("mongoose");


const restaurantSchema = new Schema({
    name: {type:String, required: true},
    coverPhoto: {type:String, required:true},
    priceRange:{
        min:{type: Number, required: true},
        max:{type: Number, required: true}
    },
    openingHours:{
        open: {type: String, required: true},
        close: {type: String, required: true}
    },
    phone: {type: Number, required: true},
    email: {type: String, required: true},
    socials:{
        whatsapp:{type: String, required: true},
        facebook:{type: String, required: true},
        instagram:{type: String, required: true}
    },    
    location: {type: String, required: true},
    area: {type: String, required: true},
    website: {type: String, required: true},
    googleMap: {type: String, required: true},  
    menu: [
        {   menuName: String,
            menuImage: String, // optional
            menuPrice: Number, // optional for now
            menuDescription: String,
            available:{
                type: Boolean,
                default: true
            }
        }
        ],
    gallery: [
        {
          galleryImage: String           
                
        }
        ],    
    approvalStatus: {
                type: String,
                enum: ["none", "pending", "approved", "rejected"],
                default: "none"},
    confirm:{type: Boolean, default: false},
    acknowledgement:{type: Boolean, default: false},           
    claimed:{type: Boolean, default: false},
    claimer:{type: String, default: null},
    claimedBy:{type: Schema.Types.ObjectId, ref: "User", default: null},    
    creator:{type: Schema.Types.ObjectId, ref: "User"},
    role:{type: Schema.Types.ObjectId, ref: "User"},
     

}, {timestamps: true})

module.exports = model("Restaurant", restaurantSchema);





