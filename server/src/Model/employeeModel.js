const mongoose = require("mongoose");
const applyJobSchema = mongoose.Schema({
  name: { type: String, required: true },
  exp: { type: Number },
  employeeId: { type: String },
  jobTitle: { type: String },
  jobDescription: { type: String },
  employerId: { type: String },
});

// Create and export the Mongoose model based on the 'applyJobSchema'
// 'applyjobs' is the name of the model and will be used to interact with the 'applyjobs' collection in MongoDB
module.exports = mongoose.model("applyjobs", applyJobSchema);
