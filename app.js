require("dotenv").config({path:"./.env"})
const express = require("express")
const app = express()
const env = process.env
const cookieParser = require('cookie-parser');

// cors
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));


app.use(express.json());
app.use(cookieParser());
//database connections
require("./models/database").connectDatabase()

//logger 
const logger = require("morgan")
app.use(logger("tiny"))

// body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

//Routes
app.use("/",require("./routes/indexRoutes"));
app.use("/services",require("./routes/servicesRoutes"));
app.use("/invoice",require("./routes/invoiceRoutes"));
app.use("/payment",require("./routes/paymentRoutes"));



//error handling
const errorHandler = require("./utils/errorHandler")
const { generatedErrors } = require("./middlewares/errors")

app.all("*",(req,res,next)=>{
    next(new errorHandler(`Page not found ${req.url}`,404))
})

app.use(generatedErrors)

app.listen(env.PORT,console.log(`server is running on port ${env.PORT}`))