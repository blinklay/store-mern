const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
}, {
  timestamps: true
})

module.exports = model("User", UserSchema)