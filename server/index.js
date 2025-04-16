const express = require("express")
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRoutes");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors")
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN

mongoose.connect(MONGODB_URI)
  .then(() => console.log("DB start!"))
  .catch(e => console.log("DB crash!", e))

const app = express()
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json())

app.use("/auth", authRouter)
app.use("/admin", adminRouter)
app.use("/product", productRouter)
app.use("/user", userRouter)

app.listen(PORT, () => console.log("server start!"))