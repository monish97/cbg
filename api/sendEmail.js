import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: email,
            to: 'mhv9390@gmail.com', // Replace with your email
            subject: subject,
            text: message,
        });

        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send email' });
    }
}
