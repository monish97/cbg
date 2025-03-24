export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const response = await fetch("https://formsubmit.co/" + process.env.EMAIL_TO, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                email,
                subject,
                message,
            }).toString(),
        });

        if (!response.ok) throw new Error("Failed to send email");

        return res.status(200).json({ message: "Thank you for contacting us. Your request has been sent to support." });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred. Please try again." });
    }
}
