const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "pleacse enter name "],
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
        },

        price: {
            type: Number,
            required: true,
            default: 0,
        },

        image: {
            type: String,
            required: false,
        },

        phoneNumber: {
            type: Number,
            required: true,
        },
    },
    {
        Timestamp: true,
    }
);

const product = mongoose.model("Product", ProductSchema);
module.exports = product; 