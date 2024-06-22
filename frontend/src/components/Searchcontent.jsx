import jobData from "../demodata/demo.js";
import "../css/home.css";
import "../css/styles.css";
import { useEffect, useState } from "react";

function Searchcontent() {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    setJobs(jobData);
  }, []);
  
  return (
    <>
      <section className="main-content w-auto z-8 mt-8 text-center  h-auto m-auto pt-16">
        <div className="search-container max-w-2xl m-auto">
          <h2 className="mb-2 text-2xl font-bold ">Find Your Dream Job</h2>
          <input className="w-3/5 p-2.5 text-gray-600 text-base outline-none" type="text" placeholder="Search for jobs..." />
          <button className="p-2 px-4 text-lg bg-custom-search search-btn text-white  cursor-pointer">Search</button>
        </div>
        <div className="recent-jobs-section flex-1">
          <h2 className="text-xl font-medium ">Recent Jobs</h2>
          <div className="job-grid grid ">
            {jobs.map((job, index) => (
              <div className="job-card" key={index}>
                <h3>{job.title}</h3>
                <p>
                  {job.company}
                  <br />
                  {job.location}
                </p>
              </div>
            ))}
          </div>
          <div className="seeMore">
            <button type="submit">See More</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Searchcontent
