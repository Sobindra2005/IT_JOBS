import jobData from "../jobdemo/demo.js";
import "../css/home.css";
import "../css/styles.css";
import { useEffect, useState } from "react";

function Home() {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    setJobs(jobData);
  }, []);
  
  return (
    <>
      <section className="main-content">
        <div className="search-container">
          <h2>Find Your Dream Job</h2>
          <input type="text" placeholder="Search for jobs..." />
          <button className="search-btn">Search</button>
        </div>
        <div className="recent-jobs-section">
          <h2>Recent Jobs</h2>
          <div className="job-grid">
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

export default Home;
