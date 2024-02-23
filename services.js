const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({

    serviceName: {
        type: String,
        require: [true, "Service name is require"]
    },
    subService: {
        type: String,
        require: [true, "Sub-Service is Require"]
    },
    features: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    addOns: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "addOns",
        }
    ],
    consulting: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "consulting",
        }
    ]

}, { timestamps: true });



const serviceModel = mongoose.model("service", serviceSchema);

module.exports = serviceModel;