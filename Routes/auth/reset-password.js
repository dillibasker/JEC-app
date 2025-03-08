const express=require("express")
const router=express.router()
const User=require("../../Models/userSchema")
const bcrypt=require("bcryptjs")

router.post("/reset-password", async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error resetting password", error: err.message });
    }
});

module.exports=router