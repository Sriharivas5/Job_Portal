import React, { useEffect, useState } from "react";
import axios from "axios";
import heroBg from "../../../../assets/emprBg.jpeg";
import "./ViewPostedJobs.scss";
import { Link } from "react-router-dom";
import Navbar from "../../../../Components/Navbar/Navbar";

function ViewPostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // getting jobs using axios method and updating jobs state variable
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getJobs")
      .then((res) => setJobs(res.data));
      jobs && console.log(jobs)
  }, [editId]);

  const filteredJobs = jobs.filter(
    (job) => job.employerId == sessionStorage.getItem("Id")
  );
  console.log(filteredJobs); //consoling the sample output

  //creating a handle delete function that can delete posted jobs,  using axios method based on id
  const handleDelete = async (requestedId) => {
    axios.delete(`http://localhost:3000/api/deleteJob/${requestedId}`);
    window.location.reload(true);
  };

  //creating a handle update function that can update posted jobs,  using axios method based on id,title,desc
  const handleUpdate = async (id, title, desc) => {
    setEditId(id);
    setEditTitle(title);
    setEditDescription(desc);
  };

  const handleSave = async (requestedId, title, description) => {
    axios
      .put(`http://localhost:3000/api/updateJob/${requestedId}`, {
        jobTitle: title,
        jobDescription: description,
      })
      .then(() => setEditId(""));
  };

  return (
    <>
      <Navbar />
      <div className="viewPostedJobs">
        <div className="heroSection">
          <div>
            <h1>Job Recruitement Solution </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              aperiam quis doloremque, cumque fuga ab ipsum quam architecto nam
              eaque provident quia soluta odit natus quas. Adipisci laboriosam.
            </p>
            <Link to="/postjob">
              <button>Post A Job</button>
            </Link>
          </div>
        </div>

        <div className="postedJobs">
          <h1>ViewPostedJobs</h1>
          {/* mapping all the jobs */}
          <div className="jobContainer">
            {filteredJobs.map((item) => {
              // below we are checking whether editId is equals to item means,when user clicks on the update button it ill set the editId to current item id in that time we render based on that condition
              return editId == item._id ? (
                <div key={item._id} className="jobs">
                  <div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      autoFocus
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        handleSave(item._id, editTitle, editDescription)
                      }
                    >
                      save
                    </button>
                    {/* below when we calling handleDelete function we are sending job id which need to be deleted */}
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div key={item._id} className="jobs">
                  <div>
                    <input type="text" value={item.jobTitle} readOnly  />
                    <input type="text" value={item.jobDescription} readOnly />
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        handleUpdate(
                          item._id,
                          item.jobTitle,
                          item.jobDescription
                        )
                      }
                    >
                      Update
                    </button>
                    {/* below when we calling handleDelete function we are sending job id which need to be deleted */}
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPostedJobs;
