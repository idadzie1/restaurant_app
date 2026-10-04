const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");

const Restaurant = require("./models/restaurantModel");

dotenv.config();


// --------------------------------------------------
// 1. Cloudinary configuration
// --------------------------------------------------

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// --------------------------------------------------
// 2. Local uploads folder
// --------------------------------------------------

const uploadsFolder = path.join(__dirname, "uploads");


// --------------------------------------------------
// 3. Check whether a value is already a Cloudinary URL
// --------------------------------------------------

const isCloudinaryUrl = (value) => {

    return (
        typeof value === "string" &&
        value.includes("res.cloudinary.com")
    );
};


// --------------------------------------------------
// 4. Upload one image to Cloudinary
// --------------------------------------------------

const uploadImageToCloudinary = async (
    localFileName,
    restaurantId,
    imageType
) => {

    // Build the complete path to the local image
    const localFilePath = path.join(
        uploadsFolder,
        localFileName
    );

    // Check that the file actually exists
    console.log(
        "localFileName:",
        JSON.stringify(localFileName)
    );

    console.log(
        "uploadsFolder:",
        JSON.stringify(uploadsFolder)
    );

    console.log(
        "localFilePath:",
        JSON.stringify(localFilePath)
    );

    console.log(
        "exists:",
        fs.existsSync(localFilePath)
    );

    if (!fs.existsSync(localFilePath)) {

        console.log(
            `File not found: ${localFileName}`
        );

        return null;
    }


    // Build the Cloudinary folder
    const cloudinaryFolder =
        `restaurant-app/restaurants/${restaurantId}/${imageType}`;


    console.log(
        `Uploading: ${localFileName}`
    );

    console.log(
        `Folder: ${cloudinaryFolder}`
    );


    try {

        const result =
            await cloudinary.uploader.upload(
                localFilePath,
                {
                    folder: cloudinaryFolder
                }
            );


        console.log(
            `Uploaded successfully`
        );

        console.log(
            `URL: ${result.secure_url}`
        );

        console.log(
            "----------------------------------------"
        );


        return result.secure_url;

    } catch (error) {

        console.error(
            `Cloudinary upload failed for ${localFileName}`
        );

        console.error(
            error.message
        );

        return null;
    }
};


// --------------------------------------------------
// 5. Main migration function
// --------------------------------------------------

const migrateRestaurants = async () => {

    try {

        // Connect to MongoDB
        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            "Connected to MongoDB"
        );


        // Get all restaurants
        const restaurants =
            await Restaurant.find({});


        console.log(
            `Found ${restaurants.length} restaurant(s)`
        );


        // --------------------------------------------------
        // 6. Process each restaurant
        // --------------------------------------------------

        for (const restaurant of restaurants) {

            const restaurantId =
                restaurant._id.toString();


            console.log(
                "\n========================================"
            );

            console.log(
                `Restaurant: ${restaurant.name}`
            );

            console.log(
                `ID: ${restaurantId}`
            );

            console.log(
                "========================================"
            );


            // --------------------------------------------------
            // 7A. Migrate cover photo
            // --------------------------------------------------

            if (
                restaurant.coverPhoto &&
                !isCloudinaryUrl(
                    restaurant.coverPhoto
                )
            ) {

                const cloudinaryUrl =
                    await uploadImageToCloudinary(
                        restaurant.coverPhoto,
                        restaurantId,
                        "cover"
                    );


                if (cloudinaryUrl) {

                    restaurant.coverPhoto =
                        cloudinaryUrl;
                }
            }


            // --------------------------------------------------
            // 7B. Migrate menu photos
            // --------------------------------------------------

            if (
                restaurant.menu &&
                restaurant.menu.length > 0
            ) {

                for (
                    const menuItem
                    of restaurant.menu
                ) {

                    if (
                        menuItem.menuPhoto &&
                        !isCloudinaryUrl(
                            menuItem.menuPhoto
                        )
                    ) {

                        const cloudinaryUrl =
                            await uploadImageToCloudinary(
                                menuItem.menuPhoto,
                                restaurantId,
                                "menu"
                            );


                        if (cloudinaryUrl) {

                            menuItem.menuPhoto =
                                cloudinaryUrl;
                        }
                    }
                }
            }


            // --------------------------------------------------
            // 7C. Migrate gallery photos
            // --------------------------------------------------

            if (
                restaurant.gallery &&
                restaurant.gallery.length > 0
            ) {

                for (
                    const galleryItem
                    of restaurant.gallery
                ) {

                    if (
                        galleryItem.galleryImage &&
                        !isCloudinaryUrl(
                            galleryItem.galleryImage
                        )
                    ) {

                        const cloudinaryUrl =
                            await uploadImageToCloudinary(
                                galleryItem.galleryImage,
                                restaurantId,
                                "gallery"
                            );


                        if (cloudinaryUrl) {

                            galleryItem.galleryImage =
                                cloudinaryUrl;
                        }
                    }
                }
            }


            // --------------------------------------------------
            // 7D. Update only the migrated image fields
            // --------------------------------------------------

            await Restaurant.updateOne(
                {
                    _id: restaurant._id
                },
                {
                    $set: {
                        coverPhoto:
                            restaurant.coverPhoto,

                        menu:
                            restaurant.menu,

                        gallery:
                            restaurant.gallery
                    }
                }
            );


            console.log(
                `MongoDB updated for ${restaurant.name}`
            );
        }


        // --------------------------------------------------
        // 8. Migration complete
        // --------------------------------------------------

        console.log(
            "\n========================================"
        );

        console.log(
            "MIGRATION COMPLETE"
        );

        console.log(
            "========================================"
        );


    } catch (error) {

        console.error(
            "Migration failed:"
        );

        console.error(
            error
        );


    } finally {

        // Close MongoDB connection
        await mongoose.connection.close();

        console.log(
            "MongoDB connection closed"
        );
    }
};


// --------------------------------------------------
// 9. Start the migration
// --------------------------------------------------

migrateRestaurants();