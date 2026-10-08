const getCloudinaryPublicId = (cloudinaryUrl) => {

    const url = new URL(cloudinaryUrl);

    const pathParts = url.pathname.split("/");

    // Remove:
    // /mhzhitye/image/upload/
    // and possible version such as v1759000000

    const uploadIndex = pathParts.indexOf("upload");

    let publicIdParts = pathParts.slice(uploadIndex + 1);

    // Remove version if present
    if (publicIdParts[0]?.startsWith("v")) {
        publicIdParts.shift();
    }

    const publicIdWithExtension = publicIdParts.join("/");

    // Remove file extension
    return publicIdWithExtension.replace(/\.[^/.]+$/, "");
};

module.exports = { getCloudinaryPublicId };