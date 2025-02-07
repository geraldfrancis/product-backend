const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,  // Ensure unique constraint is applied
        },

        phoneNumber: {
            type: String,  // You can keep it a String if you want, or change to Number
            required: true,
            unique: true,  // Enforcing uniqueness for phoneNumber
        },

        userName: {
            type: String,
            required: true,
            unique: true,  // Enforcing uniqueness for userName
        },

        userNumber: {
            type: String,  // Ensure this field exists in the schema if you are using it
            required: true,
            unique: true,  // Enforcing uniqueness for userNumber
        },

        sex: {
            type: String,
            required: true,
        },

        maritalStatus: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
