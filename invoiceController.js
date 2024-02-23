const { catchAsyncErros } = require("../middlewares/catchAsyncErrors");
const invoiceModel = require("../models/invoice");
const userModel = require("../models/userModel");


exports.createInvoice = catchAsyncErros(async (req, res, next) => {
 
    // const {userId} = req.body;
    const  invoice =    new  invoiceModel(req.body);

    
    // const user = await userModel.findById(userId);
    // user.invoice.push(invoice._id);
    await invoice.save();
    res.status(200).json({status: "success", invoice});

});


