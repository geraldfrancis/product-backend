const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema(
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
        },

        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },

        userName: {
            type: String,
            required: true,
            unique: true,
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
const Client = mongoose.model ("Client", ClientSchema);
module.exports = Client