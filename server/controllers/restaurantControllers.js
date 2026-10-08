const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const HttpError = require("../models/errorModel");
const { v4: uuid } = require("uuid");
const { userInfo } = require("os");
const cloudinary = require('../config/cloudinary')
const mongoose = require('mongoose');
const { getCloudinaryPublicId } = require("../utils/cloudinaryUtils");


// ==================================================================================


const createRestaurant = async (req, res, next)=>{

    try {          
        const {name, captionPhoto, min, max, open, close, phone, email, whatsapp, facebook, instagram, location, area, website, googleMap} = req.body;        
  
        
        if(!name || min == null || max == null || !open || !close || !phone || !email || !whatsapp || !facebook || !instagram || !location || !area || !website || !googleMap){
            return next(new HttpError("Please fill in the fields. Type in NA if requested info is not available", 422))
        }      

        const minNum = parseInt(min);
        const maxNum = parseInt(max);          

        // phone regex here
        const phoneRegex = /^(?:\+233|233|0)(2[03456789]|5[0-9])\d{7}$/;
        if(!phoneRegex.test(phone)){
            return next(new HttpError("Invalid phone number", 422));
        }

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if(!timeRegex.test(open) || !timeRegex.test(close)){
            return next(new HttpError("Invalid open or close times"));
        }

        const decapEmail = email.toLowerCase()
        //use regex to validate email later
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(decapEmail)) {
            return next(new HttpError("Invalid email", 422))
        }
        
        if(!req.files || !req.files.coverPhoto){
            return next(new HttpError("Please select a picture for the cover photo", 422))
        }

        const {coverPhoto} = req.files;
        if(coverPhoto.size > 200000){
            return next(new HttpError("Size of cover photo is too big. It must be less than 200KB", 422))
        }  
        
        
        const restaurantId = new mongoose.Types.ObjectId();
        if(!restaurantId){
            return next(new HttpError("Could not generate id. try again later", 422))
        }                       

        if(req.user.role === 'admin'){          

                const result = await cloudinary.uploader.upload(
                    `data:${coverPhoto.mimetype};base64,${coverPhoto.data.toString("base64")}`,
                        {
                            folder: `restaurant-app/restaurants/${restaurantId}/cover`
                        }
                    );

                const url = result.secure_url;
                if(!url){
                    return next(new HttpError("Could not update, a possible network issues, try again later", 422))
                }           

                const newRestauant = await Restaurant.create({_id:restaurantId, name, captionPhoto, priceRange:{min:minNum, max:maxNum}, openingHours:{open, close}, phone, email:decapEmail, socials:{whatsapp, facebook, instagram}, location, area, website, googleMap, coverPhoto: url, approvalStatus:"approved", creator:req.user.id})
                res.status(201).json("Success. Pending verification and approval")
            
            }else{

                const result = await cloudinary.uploader.upload(
                    `data:${coverPhoto.mimetype};base64,${coverPhoto.data.toString("base64")}`,
                        {
                            folder: `restaurant-app/restaurants/${restaurantId}/cover`
                        }
                    );

                const url = result.secure_url;
                if(!url){
                    return next(new HttpError("Could not update, a possible network issues, try again later", 422))
                }            

                const newRestauant = await Restaurant.create({_id:restaurantId, name, captionPhoto, priceRange:{min:minNum, max:maxNum}, openingHours:{open, close}, phone, email:decapEmail, socials:{whatsapp, facebook, instagram}, location, area, website, googleMap, coverPhoto: url, claimed:true, approvalStatus:"pending", claimer:req.user.firstName, claimedBy:req.user.id, creator:req.user.id})
                res.status(201).json("Success. Pending verification and approval")
            
            }        
        
      } catch (error) {
            return next(new HttpError(error.message))
    }

}



// =========================== editing: uplsod cover photo to Cloudinary=================
//  find the mongoDB record

const editRestaurant = async (req, res, next)=>{
    try {
        const { restaurantId } = req.params;
        const restaurant = await Restaurant.findById(restaurantId);
        const oldCoverPhotoUrl = restaurant.coverPhoto
        if(!restaurant){ 
            return next(new HttpError("Could not find resturant", 422))
        }
        if(req.user.id === restaurant.creator?.toString() || req.user.role === 'admin'){
           

            const {name, captionPhoto, min, max, open, close, phone, email, whatsapp, facebook, instagram, location, area, website, googleMap} = req.body;       

            if(!name || min == null || max == null || !open || !close || !phone || !email || !whatsapp || !facebook || !instagram || !location || !area || !website || !googleMap){
                
                return next(new HttpError("Fill all fields", 422))
            }
            const minNum = parseInt(min);
            const maxNum = parseInt(max);

          

            if(!req.files || !req.files.coverPhoto){

                const updated = await Restaurant.findByIdAndUpdate(restaurantId, {name, captionPhoto, priceRange:{min:minNum, max:maxNum}, openingHours:{open, close}, phone, email, socials:{whatsapp, facebook, instagram}, location, area, website, googleMap}, {returnDocument:'after'});

                if(!updated){
                    return next(new HttpError("Update was not succcessful, try next time", 422))
                }

                res.status(201).json({message:"Success", data:updated})                                  

            }else{
                     const { coverPhoto } = req.files;                        
                    if(coverPhoto.size > 200000){
                        return next(new HttpError("Size of cover photo is too big. It must be less than 200KB", 422))
                    } 
                    const result = await cloudinary.uploader.upload(
                    `data:${coverPhoto.mimetype};base64,${coverPhoto.data.toString("base64")}`,
                        {
                            folder: `restaurant-app/restaurants/${restaurantId}/cover`
                        }
                    );

                    const newUrl = result.secure_url;
                    if(!newUrl){
                        return next(new HttpError("Could not update, a possible network issues, try again later", 422))
                    }

                        const updated = await Restaurant.findByIdAndUpdate(restaurantId, {name, captionPhoto, priceRange:{min:minNum, max:maxNum}, openingHours:{open, close}, phone, email, socials:{whatsapp, facebook, instagram}, location, area, website, googleMap, coverPhoto:newUrl}, {returnDocument:'after'});
                        
                        if(!updated){
                            return next(new HttpError("Update failed, try again later", 422))
                        }

                        res.status(201).json({message:"Success", data:updated})                        

                        // using the helper funtion to extract the public_id from the photo url 
                        const oldPublicId = getCloudinaryPublicId(oldCoverPhotoUrl);
                        await cloudinary.uploader.destroy(oldPublicId);

                }
        
        }else{

            return next(new HttpError("You are not authorized to do this operation", 422))
        }
        
    } catch (error) {
        return next(new HttpError(error.message))
    }
}



// =====================================================================================



const getAllRestaurants = async (req, res, next)=>{
    try {
        const allRestaurants = await Restaurant.find().sort({ createdAt: -1 });
        if(req.user.role === 'admin'){
          if(!allRestaurants){
            return next(new HttpError("No information found", 422))
          }else{
            res.status(200).json(allRestaurants)
          }        
       }
    } catch (error) {
        return next(new HttpError("You are not authorized.", 403))
    }
}


// api/restaurants
// Get
// unprotected
const getAllApprovedRestaurants = async (req, res, next)=>{
    
    try {        
        const restaurants = await Restaurant.find({ approvalStatus:"approved" }).sort({createdAt:-1});
        if(!restaurants){            
            return next(new HttpError("No restaurants found", 422))
        }else{
            res.status(200).json(restaurants)            
        }        
        
    } catch (error) {
        return next(new HttpError(error.message))
    }  
    
}

// api/restaurants/id
// Get
// unprotected
const getRestaurant = async (req, res, next)=>{
    try {
        // find the id
        const {restaurantId}  = req.params
        
        const getArestaurant = await Restaurant.findById(restaurantId)
           
        if(!getArestaurant){
            return next(new HttpError("The restaurant cannot be found", 404))
        }
        res.status(200).json(getArestaurant)
        
    } catch(error){
       return next(new HttpError(error.message))
    }

}

const getUserRestaurants = async (req, res, next)=>{
  try {
    const userId = req.user.id;          
    const restaurants = await Restaurant.find({creator:userId}).populate("creator","firstName lastName email telephone").sort({ createdAt: -1 })
    if(!restaurants){
        return next(new HttpError('No restaurant post', 404))
    }
    res.status(200).json(restaurants);    
     
  } catch (error) {
     return next(new HttpError(error.message))
  }
}

// api/restaurant/id
// post
// protected
// claimed: false/true
// role: user
const claimRequest = async (req, res, next)=>{    
 
    try {
        // find the restaurant id
        const { confirm, acknowledgement } = req.body;
       
            if(confirm === false || acknowledgement === false){
                return next(new HttpError("Confirm and Acknowledge by checking the boxes", 422))
            }
        const {restaurantId}=req.params;
        const findRestaurant = await Restaurant.findById(restaurantId).populate("creator");
            if(req.user.role === 'user' || req.user.role === 'admin'){

                if(!findRestaurant){
                return next(new HttpError("Restaurant can not be found", 422))
                } 

                if(findRestaurant.claimed){
                    return next(new HttpError("Restaurant ownership has been claimed already", 422))
                }
                // only for restaurants posted by admin
                if(findRestaurant.creator.role === "admin"){
                const claim = await Restaurant.findByIdAndUpdate(restaurantId, {claimed:true, confirm:true, acknowledgement:true, claimedBy:req.user.id, claimer:req.user.firstName, approvalStatus:"pending"}, {returnDocument:'after'});
                res.status(200).json({message:"The admin will verify you claims in 48 hours", claim})            
                }else{
                    return next(new HttpError("Restaurant ownership has been claimed already", 422))
                }
            }
    } catch (error) {
        return next(new HttpError(error.message))
    }

}

// api/restaurant/id
// post
// protected
// claimed: true 
// approval: false/true
// role:admin
const adminApproval = async (req, res, next)=>{
     try {
        const {restaurantId} = req.params;
        // find the restaurant ressource 
        
        const findRestaurant = await Restaurant.findById(restaurantId).populate("creator")
        
        if(!findRestaurant){
            return next(new HttpError("Can not find restaurant", 422))
        }

        if(findRestaurant.approvalStatus === "pending" && req.user.role === 'admin'){
            const approve = await Restaurant.findByIdAndUpdate(restaurantId, {approvalStatus:"approved", creator:findRestaurant.creator.claimedBy, claimer:findRestaurant.creator.fisrtName}, {returnDocument:'after'});
            res.status(200).json({message: "Approved successfuly", approve});
      

        }else{
            return next(new HttpError("You are not authorized or approved already", 422))
        }
     } catch (error) {
        return next(new HttpError(error.message))
     }
}

const reject = async (req, res, next)=>{
    try {
        const {restaurantId} = req.params;
        const findRestaurant = await Restaurant.findById(restaurantId);
        if(!findRestaurant){
            return next(new HttpError("Resource cannot be found", 404))

        }else if(req.user.role === 'admin' && findRestaurant.approvalStatus === "pending"){
            const reject = await Restaurant.findByIdAndUpdate(restaurantId, {approvalStatus:"rejected"})
            res.status(200).json({message: "Rejection successful"}, reject)
        }else{
            return next(new HttpError("Status change was not successful", 422))
        }
    
    } catch (error) {
        return next(new HttpError(error.message))        
    }
}

// api/restaurants/delete
// post
// protected



// api/restaurants/upload-cover-pic
// post
// protected
// const uploadCoverPic = (req, res, next)=>{
//     res.json("upload cover pic")
// }

// // api/restaurants/change-cover-pic
// // post
// // protected
// const changeCoverPic = (req, res, next)=>{
//     res.json("change cover pic")
// }


// api/restaurants/upload-to-menu
// post
// protected
const uploadResturantMenu = async (req, res, next)=>{    
        try {
            const {name, price, description, available} = req.body;
                if(!name || !price || !description || !available){
                    return next(new HttpError("Fill in all fields", 422))
                }

             if(!req.files || !req.files.menuPhoto){
                return next(new HttpError("Upload photo of menu", 422))
             }

             const {menuPhoto} = req.files
             if(menuPhoto.size > 200000){
                return next(new HttpError("File size should be less than 2KB", 422))
             }                               

            const { restaurantId } = req.params;
            // firmd the restaurant
            const findRestaurant = await Restaurant.findById(restaurantId)                      
            if(req.user.id === findRestaurant.creator.toString() || req.user.role === 'admin' && findRestaurant.approved){
                
                 const result = await cloudinary.uploader.upload(
                    `data:${menuPhoto.mimetype};base64,${menuPhoto.data.toString("base64")}`,
                        {
                            folder: `restaurant-app/restaurants/${restaurantId}/menu`
                        }
                    );

                const url = result.secure_url;

                if(!url){
                    return next(new HttpError("Could not update, a possible network issues, try again later", 422))
                }   

                const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, {$push: {menu: {name, price, description, menuPhoto:url, available}}}, { returnDocument: 'after'});
                res.status(200).json({message:"Menu successfully added", restaurant})
                    

            }else{
                return next( new HttpError("Unauthorized", 403));
            }
            
        } catch (error) {
            return next(new HttpError(error.message))
        }
}

// api/restaurants/edit-menu
// post
// protected
const editRestaurantMenu = async (req, res, next)=>{
    // find the restaurant id
    const { restaurantId, menuId } = req.params;    
    
    try {
            const findRestaurant = await Restaurant.findById(restaurantId);
            if(!findRestaurant){
                return next(new HttpError("No records of resturant found", 404))
            }

            const findMenu = findRestaurant.menu.id(menuId);
            if(!findMenu){
                return next(new HttpError("No records of menu found", 404))
            }
            
            const oldMenuImageUrl = findRestaurant.menu.id(menuId)?.menuPhoto
            if(!oldMenuImageUrl){
                return next(new HttpError("Could not locate image", 422))
            }
         
         if(req.user.id === findRestaurant.creator.toString() || req.user.role === 'admin'){
     
            const {name, description, price, available} = req.body;
            if(!name || !description || !price || available === false){
            return next(new HttpError("Fill in the fileds", 422))

         }else if(!req.files){
            const menu = findRestaurant.menu.id(menuId);
                menu.name = name;
                menu.description = description
                menu.price = price;
                menu.available = available;
                await findRestaurant.save();
                res.status(200).json({ message: "Updated Successfully", data: findRestaurant});
          }else if(req.files){
            // check if there an existig menu image and remove
            // const {menuPhoto} = req.files;
            const menuPhoto = req.files?.menuPhoto;
            if(menuPhoto.size > 200000){
                return next(new HttpError("Image size must not be more than 200KB", 422))
            }
            
             const result = await cloudinary.uploader.upload(
                    `data:${menuPhoto.mimetype};base64,${menuPhoto.data.toString("base64")}`,
                        {
                            folder: `restaurant-app/restaurants/${restaurantId}/menu`
                        }
                    );

                const newUrl = result.secure_url;

                if(!newUrl){
                    return next(new HttpError("Could not update, a possible network issues, try again later", 422))
                }         

                const menu = findRestaurant.menu.id(menuId);
                    menu.name = name;
                    menu.menuPhoto = newUrl;
                    menu.description = description
                    menu.price = price;
                    menu.available = available;
                    const updated = await findRestaurant.save();

                    if(!updated){
                        return next(new HttpError("Update was unsuccessful. try again later", 422))
                    }
                                               
                    const oldPublicId = getCloudinaryPublicId(oldMenuImageUrl);
                        await cloudinary.uploader.destroy(oldPublicId);
                    
                    res.status(200).json({ message: "Updated Successfully", data: findRestaurant});    
          } 
        
         }else{
            return next(new HttpError("You are not authorized to do this operation", 422))
         }
        
    } catch (error) {
        return next(error)
    }
   
}


const getMenu = async (req, res, next)=>{
    try {
          // Get the id of the restauarnt
        const {restaurantId} = req.params;
        // find restaruant 
        const restaurant = await Restaurant.findById(restaurantId)
        const menu = restaurant.menu;
        res.json(menu)
        
    } catch (error) {
        return next(new HttpError(error.message))
    }

}

// get s single menu

const getAMenu = async (req, res, next)=>{
    const { restaurantId, menuId } = req.params; 
    try {
         const restaurant = await Restaurant.findById(restaurantId)
         const menu = restaurant.menu.id(menuId)
         if(!menu){
            return next(new HttpError("Menu could not be found", 404))
         }

        if(req.user.id === restaurant.claimedBy || req.user.role === "admin"){        
            res.status(200).json(menu)
        }

    } catch (error) {
        return next(new HttpError("Could not load data", 404))
    }
}


const deleteRestaurantMenu = async (req, res, next)=>{                
          
    try {
        const { restaurantId, menuId } = req.params; 
        const restaurant = await Restaurant.findById(restaurantId)
        if(!restaurant){
            return next(new HttpError("Restaurant could not be found", 404))
        }
        
        if(req.user.id === restaurant.creator.toString() || req.user.id === restaurant.claimedBy.toString() || req.user.role === 'admin'){

            const menu = restaurant.menu.id(menuId);
            if(!menu){
                return next(new HttpError("Menu not found", 404))
            }

            const menuimageUrl = menu?.menuPhoto 
            if(!menuimageUrl){
                return next(new HttpError("Image of imgae not found", 404))            
            }
            
             const menuImagePublicId = getCloudinaryPublicId(menuimageUrl);
             
             if(!menuImagePublicId){
                return next(new HttpError("Could not proceed with deletion. Try again later", 422))
             }
                await cloudinary.uploader.destroy(menuImagePublicId);
            
            // remove the menu object subrecord from the restaurant record
            // uodate the restuarnt record with deleted menu object 
            menu.deleteOne();
            const deleted = await restaurant.save();
            if(!deleted){
                return next(new HttpError("deletion is not successful. Try again", 422))
            }
            res.status(200).json({message: "Menu deleted successfully", restaurant });  
        }        
        
    } catch (error) {
        return next(new HttpError(error.message))
    }    
    
}


// api/restaurants/upload-to-gallery
// post
// protected
const uploadToGallary = async (req, res, next)=>{
    try {
        // find the restuarnt record using the id
        const { restaurantId } = req.params;
        const restaurant = await Restaurant.findById(restaurantId)         

        if(req.user.id === restaurant.claimedBy || req.user.role === 'admin'){            
            
            if(!req.files || !req.files.galleryImage){
                return next(new HttpError("Please select an image", 422))
            }            
            const{galleryImage} = req.files
            if(req.files){
                if(galleryImage.size > 200000){
                    return next(new HttpError("Image size must not be more than 200KB", 422))
                }

                if (!galleryImage.mimetype.startsWith("image/")) {
                    return next(new HttpError("Not an image file", 422));
                }

                      const result = await cloudinary.uploader.upload(
                    `data:${galleryImage.mimetype};base64,${galleryImage.data.toString("base64")}`,
                        {
                            folder: `restaurant-app/restaurants/${restaurantId}/gallery`
                        }
                    );

                const newUrl = result.secure_url;

                if(!newUrl){
                    return next(new HttpError("Could not update, a possible network issues, try again later", 422))
                }            
                    // find the gallery array of objects n push.
                    const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, {$push: {gallery:{galleryImage:newUrl}}}, { returnDocument:'after'})
                    
                    if(!restaurant){
                        return next(new HttpError("Upload to db not successful, Try again later", 422))
                    }
                    res.status(200).json({message:"Successfully Uploaded", data:restaurant.gallery})                             

            }

        }        
    } catch (error) {
        return next(new HttpError(error.message))
    }
    
}



const changeGallery = async (req, res, next)=>{
    try {
        const {restaurantId, galleryId} = req.params;
        const restaurant = await Restaurant.findById(restaurantId)        
        const gallery = restaurant.gallery.id(galleryId)
        const oldImageUrl = gallery?.galleryImage
        if(!restaurant){
            return next(new HttpError("Restaurant info can't be found", 422))
        }        
        
        if(!gallery){
            return next(new HttpError("Gallery info can't be found", 422))
        }
              
        const {galleryImage} = req.files
        if(req.user.id === restaurant.creator.toString() || req.user.role === 'admin'){       
            if(!req.files || !req.files.galleryImage){
                return next(HttpError("No image file selected", 404))
            }

            if(req.files){
                if(galleryImage.size > 200000){
                    return next(HttpError("Image should not be more than 200KB", 422))
                }
            }

            if (!galleryImage.mimetype.startsWith("image/")) {
                    return next(new HttpError("Not an image file", 422));
            }                

                    const result = await cloudinary.uploader.upload(
                    `data:${galleryImage.mimetype};base64,${galleryImage.data.toString("base64")}`,
                        {
                            folder: `restaurant-app/restaurants/${restaurantId}/gallery`
                        }
                    );

                const newUrl = result.secure_url;

                if(!newUrl){
                    return next(new HttpError("Could not update, a possible network issues, try again later", 422))
                }           
                // find the gallery object and populate
                const oldImagePublicId = getCloudinaryPublicId(oldImageUrl);
                if(!oldImagePublicId){
                    return next(new HttpError("Could not remove the old image. Try again next time", 422))
                }
                const gallery = restaurant.gallery.id(galleryId);
                if(!gallery){
                    return next(new HttpError("Couldn't find gallery", 422))
                }                    
                gallery.galleryImage = newUrl;
                await restaurant.save();                
                await cloudinary.uploader.destroy(oldImagePublicId);
                res.status(200).json({message: "Saved successfully", data: gallery})
        }
        
        
    } catch (error) {
        return next(new HttpError(error.message))
    }

}


// api/restaurants/delete-from-gallery
// post
// protected
const deleteFromGalleryImage = async (req, res, next)=>{
    try {
        // find the restaurant first and then the associated gallery image
        const { restaurantId, galleryId } = req.params;
        const restaurant = await Restaurant.findById(restaurantId);
        const galleryObj = restaurant.gallery.id(galleryId);
        
        if(req.user.id === restaurant.creator.toString() || req.user.role === 'admin'){
            if(!galleryObj){
                return next(new HttpError("Gallery record  not found", 404))              
               
            }

            if(!galleryObj?.galleryImage){
                return next(new HttpError("Gallery image could not be found", 500))
            }

            // extract the publicId from the url
            const url = galleryObj?.galleryImage
            // extract public_id using the helper function
            const publicId = getCloudinaryPublicId(url);
            
            galleryObj.deleteOne()           
            const deletion = await restaurant.save();
             if(!deletion){
                return next(new HttpError("Deletion process failed. Try again later", 500))
            }

             const deletionFronCloud = await cloudinary.uploader.destroy(publicId);
             if(!deletionFronCloud){
                return next(new HttpError("Deletion of image from cloudinary not successful", 422))
             }

             res.status(200).json({message: "Photo deleted successfully"})            
   
        }

        
    } catch (error) {
        return next(new HttpError(error.message))
    }
}


const adminAprovalPage = async (req, res, next)=>{
    try {
        if(req.user.role==='admin'){
        const pendingApprovals = await Restaurant.find({claimed:true, approvalStatus:"pending"}).populate("creator", "-password")
        const data = pendingApprovals.map(claim =>({
            restaurantId: claim._id,
            restaurantName: claim.name,
            restuarantPhone: claim.phone,
            restaurantCoverPhoto: claim.coverPhoto,
            restaurantLocation: claim.location,
            restaurantArea: claim.area,
            claimer:{
                firstName: claim.creator.firstName,
                lastNme: claim.creator.lastName,
                telephone: claim.creator.telephone,
                email: claim.creator.email
            }
        }))
        res.status(200).json(data)
    } else{
        return next(new HttpError("You are not authorized", 422))
    } 
    } catch (error) {
        return next(new HttpError(error.message))
    }    

}



const deleteRestaurant = async(req, res, next)=>{
    // find the restuarnt
    try {   
        
            const { restaurantId } = req.params;
            const restaurant = await Restaurant.findById(restaurantId)
            if((req.user.id === restaurant.creator.toString() && req.user.role === 'user') || req.user.role === 'admin'){
                if(!restaurant){
                    return next(HttpError("Restaurant resourve not found", 404))
                }

                const prefix = `restaurant-app/restaurants/${restaurantId}/`;
                const deleteFromCloud = await cloudinary.api.delete_resources_by_prefix(prefix);

                if(!deleteFromCloud){
                    return next(new HttpError("Could not delete records", 500))
                }

                const deletion = await restaurant.deleteOne()
                if(deletion.deletedCount !== 1){
                    return next(new HttpError("Deletion was not successful", 500))
                }

                res.status(200).json({message: "Resource has been deleted successfully"})
                
            }else{
                return next(new HttpError("You are not authorized. Log out", 422))
            }
            
            
    } catch (error) {
        return next(new HttpError(error.message))
    }
}



module.exports = { createRestaurant, editRestaurant, getAllApprovedRestaurants, getAllRestaurants, getRestaurant, getUserRestaurants, claimRequest, adminApproval, reject, uploadResturantMenu, editRestaurantMenu, getAMenu, getMenu, deleteRestaurantMenu, uploadToGallary, changeGallery,  deleteFromGalleryImage, deleteRestaurant, adminAprovalPage}

