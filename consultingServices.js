const mongoose = require("mongoose");

const consultingServiceSchema = new mongoose.Schema({

    consultingServices: {
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


const consultingServiceModel = mongoose.model("consulting", consultingServiceSchema);

module.exports = consultingServiceModel;