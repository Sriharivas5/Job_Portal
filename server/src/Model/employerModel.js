const mongoose = require("mongoose");
const postJobSchema = mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  employerId: { type: String },
  salary: { type: Number },
  location: { type: String },
  jobType: { type: String },
});

module.exports = mongoose.model("postJob", postJobSchema);
