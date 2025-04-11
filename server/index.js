const express = require("express")
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRoutes");
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => console.log("DB start!"))
  .catch(e => console.log("DB crash!", e))

const app = express()
app.use(cookieParser());
app.use(express.json())

app.use("/auth", authRouter)
app.use("/admin", adminRouter)

app.listen(PORT, () => console.log("server start!"))