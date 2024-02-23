const mongoose = require("mongoose");

const addOnServiceSchema = new mongoose.Schema({

    addOnServiceName: {
        type: String,
    },
   
    features: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        default: 0,
    },

    serviceId: {
        type: mongoose.Schema.ObjectId,
        ref: "service",
    }

}, { timestamps: true });


const addOnServiceModel = mongoose.model("addOns", addOnServiceSchema);

module.exports = addOnServiceModel;