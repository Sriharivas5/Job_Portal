// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import heroBg from "../../../../assets/empBg.jpeg";
// import "./ViewJobs.scss";
// import Navbar from "../../../../Components/Navbar/Navbar";
// function ViewAllJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [display, setDisplay] = useState(false);
//   const [empName, setEmpName] = useState("");
//   const [empExp, setEmpExp] = useState("");

//   const [title, setTitle] = useState("title");
//   const [id, setId] = useState("");
//   const [description, setDescription] = useState("");
//   const [employerid, setEmployerId] = useState("");
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/getJobs")
//       .then((res) => setJobs(res.data));
//   }, []);

//   const handlePopUp = async (id, title, desc, empid) => {
//     setDisplay(true);
//     setId(id);
//     setTitle(title);
//     setDescription(desc);
//     setSelectedJobId(id);
//     setEmployerId(empid);
//   };
//   const empId = sessionStorage.getItem("Id");
//   // const employerid = jobs[0].employerId;

//   console.log(jobs);
//   // console.log(jobs[0].employerId);

//   const handleApply = async (id, title, desc, empid) => {
//     // setDisplay(true);
//     setId(id);
//     setTitle(title);
//     setDescription(desc);
//     setSelectedJobId(id);
//     setEmployerId(empid);

//     axios
//       .post("http://localhost:3000/api/applyjob", {
//         name: sessionStorage.getItem("name"),
//         // exp: empExp,
//         employeeId: empId,
//         jobTitle: title,
//         jobDescription: description,
//         employerId: "employerid",
//       })
//       .then((rs) => {
//         console.log(rs.data);
//       });
//     // setDisplay(false);
//     // setEmpName("");
//     // setEmpExp("");
//   };
//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <div className="heroSection">
//           <div>
//             <h1> Recruitement </h1>
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
//               aperiam quis doloremque, cumque fuga ab ipsum quam architecto nam
//               eaque provident quia soluta odit natus quas. Adipisci laboriosam.
//             </p>
//             <Link to="/appliedjobs">
//               <button>View APplied Jobs</button>
//             </Link>
//           </div>
//         </div>

//         <div className="viewAllJobs">
//           <h1>View All Jobs</h1>
//           <div className="cardsContainer">
//             {jobs.map((item) => {
//               return (
//                 <div>
//                   <div className="jobCard">
//                     <h2>{item.jobTitle}</h2>
//                     <p>{item.jobDescription}</p>
//                     <p>{item.salary}</p>
//                     <p>{item.location}</p>
//                     <p>{item.jobType}</p>
//                     {console.log(item.jobType)}

//                     <button
//                       onClick={() =>
//                         handleApply(
//                           item._id,
//                           item.jobTitle,
//                           item.jobDescription,
//                           item.employerId
//                         )
//                       }
//                     >
//                       Applys
//                     </button>
//                   </div>
//                   {selectedJobId === item._id && display && (
//                     <div>
//                       <input
//                         type="text"
//                         value={empName}
//                         placeholder="name"
//                         onChange={(e) => setEmpName(e.target.value)}
//                       />
//                       <input
//                         type="number"
//                         value={empExp}
//                         placeholder="experience"
//                         onChange={(e) => setEmpExp(e.target.value)}
//                       />
//                       <button onClick={handleApply}>Apply</button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ViewAllJobs;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ViewJobs.scss";
import Navbar from "../../../../Components/Navbar/Navbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => toast.success("Applied Succesfully", { theme: "colored" });

function ViewAllJobs() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getJobs")
      .then((res) => setJobs(res.data));
  }, []);

  const empId = sessionStorage.getItem("Id");

  console.log(jobs);

  const handleApply = async (id, title, desc, empid) => {
    axios
      .post("http://localhost:3000/api/applyjob", {
        name: sessionStorage.getItem("name"),
        employeeId: empId,
        jobTitle: title,
        jobDescription: desc,
        employerId: empid,
      })
      .then((rs) => {
        console.log(rs.data);
        notify;
      });
  };
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="container">
        <div className="heroSection">
          <div>
            <h1> Recruitement </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              aperiam quis doloremque, cumque fuga ab ipsum quam architecto nam
              eaque provident quia soluta odit natus quas. Adipisci laboriosam.
            </p>
            <Link to="/appliedjobs">
              <button>View APplied Jobs</button>
            </Link>
          </div>
        </div>

        <div className="viewAllJobs">
          <h1>View All Jobs</h1>
          <div className="cardsContainer">
            {jobs.map((item) => {
              return (
                <div key={item._id}>
                  <div className="jobCard">
                    <div className="jobTitle">
                      <h2>{item.jobTitle}</h2>
                      <button
                        onClick={() => {
                          toast.promise(
                            handleApply(
                              item._id,
                              item.jobTitle,
                              item.jobDescription,
                              item.employerId
                            ),
                            {
                              pending: "Applying...", // This shows while waiting for the promise to resolve
                              success: {
                                render() {
                                  return"Applied Successfully  ! 🎉🎉🎉"; // Directly return the success message
                                },
                              
                              },
                              error: {
                                render({ data }) {
                                  return `Failed to apply: ${data.message}`; // Customize error message
                                },
                              },
                            }
                          );
                        }}
                      >
                        Apply
                      </button>
                    </div>
                    <div className="jobOthers">
                      <p>{item.salary}</p>
                      <p>{item.location}</p>
                      <p>{item.jobType}</p>
                    </div>
                    <div className="jobDescription">
                      <p>{item.jobDescription}</p>
                    </div>
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

export default ViewAllJobs;
