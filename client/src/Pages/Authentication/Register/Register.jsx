import React, { useState } from "react";
import axios from "axios";
import "./Register.scss";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [condition, setCondition] = useState(false);
  const [inputOtp, setInputOtp] = useState("");
  const [actualOtp, setactualOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empType, setEmpType] = useState("Employer");

  // axios.post("http://localhost:3000/api/resendOtp", {
  //   email: email,
  // });

  const navigate = useNavigate();
  axios.get("http://localhost:3000/api/getotps").then((res) => {
    console.log(res.data);
    let d = res.data.filter((item) => {
      if (item.fullname == name) {
        setactualOtp(item.otp);
        console.log(item.otp);
      }
    });
    console.log(d);
  });
  const handleSubmit = async () => {
    if (name == "" || email == "" || password == "") {
      alert("please fill all the required fileds");
    } else {
      try {
        // Attempt to send a POST request to the API
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            fullname: name,
            email: email,
            password: password,
            empType: empType,
          }
        );

        // Log the response data from the server
        console.log(response);

        // Navigate to the login page upon successful registration

        setCondition(true);
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error(
          "Error registering user:",
          error.response?.data || error.message
        );
        alert(error.response);
        // e.g., setError("Registration failed. Please try again.");
      }
    }
  };

  const handleOtp = async () => {
    if (actualOtp == inputOtp) {
      navigate("/login");
      console.log("object");
    }
  };

  return (
    <div className="register">
      <div className="container">
        {/* Form with labels */}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </label>

        {/* <label>
          Employment Type:
          <input
            type="text"
            value={empType}
            onChange={(e) => setEmpType(e.target.value)}
            placeholder="Enter employment type"
          />
        </label> */}
        <label>
          Employment Type:
          <select value={empType} onChange={(e) => setEmpType(e.target.value)}>
            <option value="Employer">Employer</option>
            <option value="Employee">Employee</option>
          </select>
        </label>
        {condition && (
          <label>
            Enter Otp
            <input
              type="text"
              value={inputOtp}
              onChange={(e) => setInputOtp(e.target.value)}
            />
          </label>
        )}

        {condition ? (
          <button onClick={handleOtp}>Verify Otp</button>
        ) : (
          <button onClick={handleSubmit}>Register</button>
        )}

        <div id="formBase">
          <p> I have already registered </p> <Link to="/login">SignIn</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
