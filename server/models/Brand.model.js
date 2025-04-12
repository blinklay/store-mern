const { Schema, model } = require("mongoose")

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  logoUrl: String
}, {
  timestamps: true
})

module.exports = model("Brand", BrandSchema)