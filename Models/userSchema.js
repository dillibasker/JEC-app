const mongoose=require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    resetToken: String,
    resetTokenExpiry: Date,
});

const users = mongoose.model("users", UserSchema);
module.exports = users; 