const express=require("express")
const router=express.router()
const forgotpassword=require("../../Models/forgot-password")
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const token = crypto.randomBytes(20).toString("hex");
        const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;

        // Save token in DB with expiry (15 min)
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            
            subject: "Password Reset Request",
            text: `Click here to reset your password: ${resetUrl}`,
        };
        await transporter.sendMail(mailOptions);
        console.log("✅ Email Sent:", resetUrl);
        res.json({ message: "Password reset link sent to email!" });
    } catch (err) {
        console.error("Email Error:", err);
        res.status(500).json({ message: "Error sending email", error: err.message });
    }
});