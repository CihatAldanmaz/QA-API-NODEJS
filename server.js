const express = require("express");
const dotenv = require("dotenv")
const routers = require("./routers/index")
const connectDatabase = require("./helpers/database/connectDatabase")

dotenv.config({
    path: "./config/env/config.env"
})

//MongoDB Connection
connectDatabase();

const app = express();

const PORT = process.env.PORT;

// Routers Middleware

app.use("/api", routers);
app.use((err,req,res,next) => {
    console.log("Custom Error Handler")

    res
    .json({
        success: false
    })
})

app.listen(PORT, () => {
    console.log(`Server Started! on ${PORT} = ${process.env.NODE_ENV}`)
})