const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    
    // id: {
    //    type: mongoose.Schema.ObjectId,
    //    ref: "user"
    // },


    email: {
        type: String, 
        required: true
    },

    billingInformation: {
        type: Object,
        require: true
    },
    
    totalPrice: {
        type: Number,
        require: true,
    },

    orderType: {
        type: String,
        enum: ["subscription", "service"],
        require: true,
    },

    orderSummary:{
        type: Object,
        require: true,
    },
   
    smsService:{
        type: Boolean,
        require:true,
        default: false,
    }



}, { timestamps: true });


const invoiceModel = mongoose.model("invoice", invoiceSchema);

module.exports = invoiceModel;