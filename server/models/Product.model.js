const { Schema, model } = require("mongoose")

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sale: Number,
  count: {
    type: Number,
    required: true,
  },
  imageUrl: String,
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand"
  }
}, {
  timestamps: true
})

module.exports = model("Product", ProductSchema)