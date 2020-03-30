const express = require("express");
const dotenv = require("dotenv")
const routers = require("./routers/index")
const customErrorHandler = require("./middlewares/errors/customErrorHandler")
const connectDatabase = require("./helpers/database/connectDatabase")
const path = require("path")

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

//Static Files
app.use(express.static(path.join(__dirname,"public")));

app.listen(PORT, () => {
    console.log(`Server Started! on ${PORT} = ${process.env.NODE_ENV}`)
})