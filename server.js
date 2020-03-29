const express = require("express");
const dotenv = require("dotenv")
const routers = require("./routers/index")
const customErrorHandler = require("./middlewares/errors/customErrorHandler")
const connectDatabase = require("./helpers/database/connectDatabase")

dotenv.config({
    path: "./config/env/config.env"
})

//MongoDB Connection
connectDatabase();

const app = express();

app.use(express.json())

const PORT = process.env.PORT;

// Routers Middleware

app.use("/api", routers);
app.use(customErrorHandler);

app.listen(PORT, () => {
    console.log(`Server Started! on ${PORT} = ${process.env.NODE_ENV}`)
})