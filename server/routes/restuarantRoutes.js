const {Router} = require('express')
const authMiddleWare = require('../middleware/authMiddleWare')
const { createRestaurant, editRestaurant, getAllApprovedRestaurants, getAllRestaurants, getUserRestaurants, getRestaurant, claimRequest, adminApproval, reject, uploadResturantMenu, editRestaurantMenu, getAMenu, getMenu, deleteRestaurantMenu, uploadToGallary, changeGallery, deleteFromGalleryImage, deleteRestaurant, adminAprovalPage} = require("../controllers/restaurantControllers")

const router = Router()

router.post('/create-restaurant', authMiddleWare, createRestaurant);
router.patch('/edit/:restaurantId', authMiddleWare, editRestaurant);
router.get("/get-all-approved-restaurants", getAllApprovedRestaurants);
router.get('/get-all-restaurants', authMiddleWare, getAllRestaurants);
router.get("/get-restaurant/:restaurantId", getRestaurant);
router.get('/claimed-restaurants', authMiddleWare, adminAprovalPage);
router.get('/restaurants-by-user/:userId', authMiddleWare, getUserRestaurants);
router.patch("/reject-restaurant/:restaurantId", authMiddleWare, reject);
router.patch("/claim/:restaurantId", authMiddleWare, claimRequest);
router.patch("/approve/:restaurantId", authMiddleWare, adminApproval);
router.patch("/:restaurantId/menu", authMiddleWare, uploadResturantMenu);
router.patch('/:restaurantId/menu/:menuId', authMiddleWare, editRestaurantMenu);
router.get('/:restaurantId/menu/', getMenu);
router.get('/:restaurantId/menu/:menuId', authMiddleWare, getAMenu)
router.delete('/:restaurantId/menu/:menuId', authMiddleWare, deleteRestaurantMenu);
router.patch("/:restaurantId/gallery/", authMiddleWare, uploadToGallary);
router.patch('/:restaurantId/gallery/:galleryId', authMiddleWare, changeGallery )
router.delete("/:restaurantId/gallery/:galleryId", authMiddleWare, deleteFromGalleryImage);
router.delete("/delete/:restaurantId", authMiddleWare, deleteRestaurant);

module.exports = router