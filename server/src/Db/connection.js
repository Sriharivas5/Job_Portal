const mongoose = require("mongoose");

const url =
  "mongodb+srv://sriharivas5:eKdIiR2TnJh5MbCM@jobportal.eaweb.mongodb.net/?retryWrites=true&w=majority&appName=JobPortal";
const url2 = "mongodb://localhost:27017/jobportal";
mongoose
  .connect(url)
  .then(() => {
    console.log("database connected succefully");
  })
  .catch((err) => console.log(err));
