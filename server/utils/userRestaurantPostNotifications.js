const  { Resend } =require('resend')

const sendUserNotification = async({
    to,
    subject,
    html,
    text
})=>{

    try {
        if(!process.env.RESEND_API_KEY || !process.env.SENDER_EMAIL || !process.env.ADMIN_EMAIL){
            throw new Error("Resend email environment variables are missing.");
        }
       

            const resend = new Resend(process.env.RESEND_API_KEY);

            await resend.emails.send({
            from: process.env.SENDER_EMAIL,
            to,
            subject,
            html,
            text
            });


    } catch (error) {
        console.error("Email notification failed:", error.message);
        throw error;
    }

}

module.exports = { sendUserNotification };