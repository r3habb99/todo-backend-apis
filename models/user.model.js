const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        RegExp: /^\S+@\S+\.\S+$/,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
},{
    timestamps: true 
})

const User = mongoose.model("User", userSchema);
module.exports = User;