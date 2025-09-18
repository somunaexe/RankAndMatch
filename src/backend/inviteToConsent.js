import nodemailer from 'nodemailer'
import express from 'express'
import dotenv from "dotenv";
dotenv.config();

const app = express()
app.use(express.json())

app.post('/admin', async (req, res) =>{
    const { interestId, timestamp, email, topicId, role } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Click the link to join a video",
            text: `Hey! Please paste the link rankandmatch.com/consent?topicId=${topicId}&role=${role}&interest=${interestId}${timestamp} in your browser so you can fill the consent form. After completing this, you can be casted.`,
            html: `
                <div style="font-family: Arial, sans-serif; color:#111;">
                    <h1 style="color:#E11D48;">Welcome!</h1>
                    <p>Click the button to fill the consent. After completing the you can be casted:</p>
                    <p>
                    <a href="rankandmatch.com/consent?topicId=${topicId}&role=${role}&interest=${interestId}${timestamp}" 
                        style="display:inline-block;padding:12px 20px;background:#ef4444;color:#fff;border-radius:8px;text-decoration:none;">
                        Join the show
                    </a>
                    </p>
                    <p style="font-size:12px;color:#666">If the button doesn't work, copy-paste the link into your browser.</p>
                </div>
            `
        };

        // Send
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Email sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
})

app.listen(3000, () => console.log(`Server running on port 3000`))