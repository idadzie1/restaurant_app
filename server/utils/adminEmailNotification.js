// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     }
// })


// const sendAdminEmail = async({subject, text, html})=>{
//     if (!process.env.ADMIN_EMAIL ||
//         !process.env.EMAIL_USER ||
//         !process.env.EMAIL_APP_PASSWORD) {
//         console.error("Admin email notification skipped: email environment variables are missing.");
//         return;
//     }

//     try {
//         await transporter.sendMail({
//             from: `"Ghana Restaurants Hub" <${process.env.EMAIL_USER}>`,
//             to: process.env.ADMIN_EMAIL,
//             subject,
//             text,
//             html,
//         });

//         console.log(`Admin email sent: ${subject}`);
//     } catch (error) {
//         // Email failure should not undo a successful database operation.
//         console.error("Admin email failed:", error.message);
//     }

// }

// module.exports = { sendAdminEmail };


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
        service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendAdminNotification = async ({ subject, text, html }) => {

    if (
        !process.env.EMAIL_USER ||
        !process.env.EMAIL_ADMIN ||
        !process.env.EMAIL_PASS
    ) {
        throw new Error("Email environment variables are missing.");
    }

    try {
        const sendNotification = await transporter.sendMail({
            from: `"Ghana Restaurants Hub" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_ADMIN,
            subject,
            text,
            html
        });

        console.log("Admin notification sent:", sendNotification.messageId);

        return sendNotification;

    } catch (error) {
        console.error("Admin email failed:", error.message);
        throw error;
    }
};

module.exports = { sendAdminNotification };
