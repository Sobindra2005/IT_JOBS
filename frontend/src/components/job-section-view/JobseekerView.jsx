import { useEffect, useState } from "react";
import jobData from "../../demodata/jobData"; 

function JobseekerView() {
const title=["Company ","Job Title","Location ", "Status"]

  const[datas,setdatas]=useState([])
  useEffect(() => {
    setdatas(jobData);
  }, []);

  return (
    <>
  
      <section className="main-content w-3/5 z-8 mt-16 p-8 text-center  border-t-2 border-gray-300  shadow-xl h-auto m-auto pt-16">
        {/* main content for the job section */}
        <div className=" grid  grid-cols-4 shadow text-left ">
          {title.map((title, index) => (
            <div key={index} className="  px-2 text-lg text-gray-600 font-medium ">
            {title}
            </div>
          ))}
   {datas.map((data, index) => (
   <>
           <div className="mt-3 px-2  text-lg  ">{data.company}</div>
           <div className="mt-3 px-2 text-lg "> {data.jobTitle}</div>
           <div className="mt-3 px-2  text-lg "> {data.location} </div>
        <div className={`mt-3 px-2  text-lg ${data.status==="Accepted" ? 'text-yellow-400' : data.status==="Rejected"? 'text-red-800':'text-green-700' }`} >{data.status} { data.status==="Accepted"? <i class="bi bi-arrow-right  text-xl ml-2  p-1 rounded-md   text-notification cursor-pointer  "></i>  :""}</div>
       
</>

          ))}

          
        </div>
      </section>
    </>
  );
}

export default JobseekerView;
