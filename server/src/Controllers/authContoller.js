require("dotenv").config({ path: "./.env" });

const jwt = require("jsonwebtoken"); // For generating JSON Web Tokens (JWTs)
const bcrypt = require("bcryptjs"); // For hashing and comparing passwords

const User = require("../Model/authModel");
const otpModel = require("../Model/otpModel");

const secretKey = "process.env.SECRET_KEY";
const { sendOtp } = require("./otpController");

exports.registerUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { fullname, email, password, empType } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ fullname });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this usrname" });
    }

    // Generate a JWT token for the user with an expiration time of 1 hour
    const token = jwt.sign({ email, empType }, secretKey, { expiresIn: "1h" });

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      empType,
    });

    const savedUser = await newUser.save();

    let date = new Date();
    let otpData = await sendOtp(fullname, email, date);
    console.log(otpData);

    // Save the updated user document

    res.status(201).json({ user: savedUser, token, otpData });
  } catch (error) {
    res.status(500).send("Error registering user", error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { fullname, password } = req.body;

    // Find the user in the database by fullname
    const user = await User.findOne({ fullname });

    if (!user) {
      // If no user is found, respond with an error message
      return res.status(401).send("Invalid credentials");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ fullname: fullname }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      // If the password is valid, respond with user details (you might want to include a JWT token here)
      res.status(200).json({ token: token, user: user });
    } else {
      // If the password is incorrect, respond with an error message
      res.status(401).send("Enter correct password");
    }
  } catch (error) {
    // Handle any errors that occur during user login
    res.status(500).send(error);
    console.log(error);
  }
};
