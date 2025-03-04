const mongoose=require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    resetToken: String,
    resetTokenExpiry: Date,
});

const User = mongoose.model("User", UserSchema);