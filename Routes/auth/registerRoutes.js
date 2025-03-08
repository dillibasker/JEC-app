const express=require("express")
const router=express.Router()
const users=require("../../Models/userSchema")
const bcrypt=require("bcryptjs")

router.post("/", async (req, res) => {
    try {
        console.log("Received request:", req.body);  // ✅ Debugging

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            console.log("Validation failed");  // ✅ Debugging
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            console.log("User already exists");  // ✅ Debugging
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new users({ username, email, password: hashedPassword });

        await user.save();
        console.log("User registered successfully");  // ✅ Debugging
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Register Error:", err);  // ✅ Debugging
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

module.exports=router