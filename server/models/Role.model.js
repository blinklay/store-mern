const { Schema, model } = require("mongoose")

const RoleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    default: "user"
  }
})

module.exports = model("Role", RoleSchema)