const mongoose = require("mongoose")


exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.mongodbUrl)
        console.log("database connected")

    } catch (error) {

        console.log("Database Error", error);
    }
}