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

// ==========================================================================

// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//         service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// const sendAdminNotification = async ({ subject, text, html }) => {

//     if (
//         !process.env.EMAIL_USER ||      
//         !process.env.EMAIL_PASS
//     ) {
//         throw new Error("Email environment variables are missing.");
//     }

//     try {
//         const sendNotification = await transporter.sendMail({
//             from: `"Ghana Restaurants Hub" <${process.env.EMAIL_USER}>`,
//             to: process.env.EMAIL_ADMIN,
//             subject,
//             text,
//             html
//         });

//         console.log("Admin notification sent:", sendNotification.messageId);

//         return sendNotification;

//     } catch (error) {
//         console.error("Admin email failed:", error.message);
//         throw error;
//     }
// };

// module.exports = { sendAdminNotification };


// ================================================================================

const sendAdminNotification = async ({
    to = process.env.ADMIN_EMAIL,
    subject,
    text,
    html,
    replyTo
}) => {

    if (
        !process.env.BREVO_API_KEY ||
        !process.env.BREVO_SENDER_EMAIL ||
        !to
    ) {
        throw new Error("Brevo email environment variables are missing.");
    }

    try {

        const recipients = Array.isArray(to)
            ? to.map(recipient =>
                typeof recipient === "string"
                    ? { email: recipient }
                    : recipient
            )
            : [{ email: to }];

        const emailPayload = {
            sender: {
                name: process.env.BREVO_SENDER_NAME || "Ghana Restaurants Hub",
                email: process.env.BREVO_SENDER_EMAIL
            },

            to: recipients,
            subject,
            textContent: text,
            htmlContent: html
        };

        // Include replyTo only when supplied
        if (replyTo) {
            emailPayload.replyTo = {
                email: replyTo
            };
        }

        const response = await fetch(
            "https://api.brevo.com/v3/smtp/email",
            {
                method: "POST",

                headers: {
                    "accept": "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json"
                },

                body: JSON.stringify(emailPayload)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                `Brevo API error (${response.status}): ${JSON.stringify(result)}`
            );
        }

        console.log("Email successfully accepted by Brevo:", result.messageId);

        return result;

    } catch (error) {

        console.error("Email notification failed:", error.message);

        throw error;
    }
};

module.exports = { sendAdminNotification };

