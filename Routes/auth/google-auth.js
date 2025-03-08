const express=require("express")
const router=express.router()
const User=require("../../Models/userSchema")

router.post("/google-auth", async (req, res) => {
    try {
        const { username, email } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ username, email });
            await user.save();
        }

        res.status(200).json({ message: "Google sign-in successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports=router