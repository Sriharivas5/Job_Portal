import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PostJob.scss";
import Navbar from "../../../../Components/Navbar/Navbar";

function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobsalary, setJobSalary] = useState("");
  const [Type, setType] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  const handlePost = async () => {
    if (title == "" || description == "") {
      alert("please enter all fields");
    } else {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/postJobs",
        {
          jobTitle: title,
          jobDescription: description,
          employerId: sessionStorage.getItem("Id"),
          salary: jobsalary,
          location: jobLocation,
          jobType: Type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(Type);
      console.log(response.data);
      setTitle("");
      setDescription("");
      setJobLocation("");
      setJobSalary("");
      setType("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="container">
          <h1>Post A Job</h1>

          <label>
            Job Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="job role"
            />
          </label>
          <label>
            Job Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
            />
          </label>
          <label>
            Salary
            <input
              type="text"
              value={jobsalary}
              onChange={(e) => setJobSalary(e.target.value)}
              placeholder="salary"
            />
          </label>
          <label>
            Location
            <input
              type="text"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              placeholder="location"
            />
          </label>
          <label>
            Job Type
            <input
              type="text"
              value={Type}
              onChange={(e) => setType(e.target.value)}
              placeholder="full-time / part-time"
            />
          </label>

          <button onClick={handlePost}>Post</button>
          <Link to="/viewpostedjobs">
            <button>Go To Home Page</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default PostJob;
