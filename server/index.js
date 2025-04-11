const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => console.log("DB start!"))
  .catch(e => console.log("DB crash!", e))

const app = express()
app.use(express.json())

app.listen(PORT, () => console.log("server start!"))