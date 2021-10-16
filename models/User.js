const { model, Schema } = require("mongoose");

const user_schema = new Schema({
  username: {
    type: "String",
    required: true,
  },
  first_name: {
    type: "String",
    required: true,
  },
  last_name: {
    type: "String",
    default: null,
  },
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
  },
  api_key: {
    type: "String",
    default: null,
  },
});

const User = model("user", user_schema);

module.exports = User;
