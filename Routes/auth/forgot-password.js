const express=require("express")
const router=express.Router()
const Users=require("../../Models/userSchema")
const nodemailer=require("nodemailer")
const crypto=require("crypto")
const { log } = require("console")

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        const resetUrl = `http://192.168.21.136:5000/reset-password/${token}`;


        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            },
        })

        const mailOption={
            from:process.env.EMAIL_USER,
            to:user.email,
            subject:"PassWord Reset  Request",
            html:`<p>Click the below link reset the password:</p>
                  <a href="${resetLink}" ${resetLink} > 
                  <p>This link is valid for 1 hour.</p>`
                    
        }
        await transporter.sendMail(mailOption)
        res.json({ message: "Password reset link sent to email!" });
    } catch (err) {
        console.error("Email Error:", err);
        res.status(500).json({ message: "Error sending email", error: err.message });
    }
});

router.post("/reset-password/:token",async(req,res)=>{
    const {token} =req.body
    const {newPassword}=req.body
    try{
    const user= jwt.verify(token,process.env.JWT_SECRET)
    if(!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully." });

    }catch(err){
      res.status(400).json({ message: "Invalid or expired token" });   
    }
})

module.exports=router