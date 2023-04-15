const mongoose = require("mongoose");

const traderInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  conformpassword: {
    type: String,
    required: true,
  },
});

//now we need to create a collection
//class thats why capital
const Register = new mongoose.model("ClusterNew", traderInfoSchema);
module.exports = Register;