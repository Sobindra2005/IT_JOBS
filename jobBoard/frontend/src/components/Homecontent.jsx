import jobData from "../jobdemo/demo.js";
import "../css/home.css";
import "../css/styles.css";
import { useEffect, useState } from "react";

function Searchcontent() {
//   const [jobs, setJobs] = useState([]);
  
//   useEffect(() => {
//     setJobs(jobData);
//   }, []);
  
  return (
    <>
      <section className="main-content w-3/5  mt-8 text-center  bg-slate-50 h-auto m-auto pt-16">
        <div className="job-post max-w-2xl m-auto">
         
        </div>
        <div className="Job-list-section flex-1">

          
        </div>
      </section>
    </>
  );
}

export default Searchcontent
