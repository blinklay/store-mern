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
  ]
}, {
  timestamps: true
})

module.exports = model("User", UserSchema)