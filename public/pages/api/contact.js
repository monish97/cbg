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

        res.status(200).send("Success"); // Don't send JSON response
    } catch (error) {
        res.status(500).send("Error sending message");
    }
}
