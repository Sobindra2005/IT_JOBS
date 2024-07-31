import { useEffect, useState } from "react";
import { appliedJobs } from "../../api/jobview/jobseeker";

function JobseekerView(props) {
  const [appliedjobs, setappliedjobs] = useState([]);
  const [view, setview] = useState("applied-jobs");

  useEffect(() => {
    if (view == "my-post") {
      props.setJobView(true);
    }
    if (view == "applied-jobs") {
      props.setJobView(false);
    }
  }, [view]);


  const getappliedJobs=async ()=>{
    const jobs=await appliedJobs()
  
    setappliedjobs(jobs.data)
  }
  useEffect(() => {
    getappliedJobs()
  }, []);

  return (
    <>
      <section className="main-content w-3/5 z-8 p-8 mt-3  border-t-2 border-gray-300  shadow-md h-auto m-auto pt-16">
        <select
          id="view"
          value={view}
          onChange={(e) => setview(e.target.value)}
          className=" custom-select text-xl mb-7 w-[8em] text-gray-600  "
        >
          <option value="my-post">My Post</option>
          <option value="applied-jobs">Applied Jobs</option>
        </select>

        <h1 className="text-2xl text-left font-semibold ">Applied Jobs List</h1>
        {/* job lists overview */}

        <div className="border-t-2  border-black mt-2 ">
          {/* Top bar  */}
          <div className=" mt-2 text-gray-600 text-md  px-2 pl-10 flex justify-between ">
            <div>jobs Titles </div>
            <div className="flex pr-10 ">
              <div className="mr-[8rem] ">dates of Applies</div>
              <div className="normal-case ">Status </div>
            </div>
          </div>
          {appliedjobs.map((data, index) => (
            <>
              <div
                key={index}
                className="mt-3 hover:bg-gray-200 cursor-pointer  p-4 flex flex-row justify-between rounded-xl w-full shadow shadow-zinc-400 "
              >
                <div className="flex flex-row ">
                  <span className="flex items-center"> {index + 1}.</span>
                  <h1 className=" pl-3 flex text-base font-semibold items-center ">
                    {data.jobTitle}
                  </h1>
                </div>
                <div className="flex h-full ">
                  {/* date of post */}
                  <p className=" flex items-center mr-[5rem] text-sm text-gray-600 ">
                  {
                  `${new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
                   }
                  </p>
                  <button
                    type="submit"
                    className=" flex items-center justify-center font-medium text-base   p-2 h-10 w-32   "
                  >
                    <span
                      className={`ml-2 flex justify-center w-full ${
                        data.status === "Accepted"
                          ? "text-yellow-500  "
                          : data.status === "Rejected"
                          ? "text-red-800"
                          : "text-orange-600 "
                      }`}
                    >
                      {data.status}
                      <span className={`pl-2 ${
                        data.status === "Accepted"
                          ? " bi bi-check-circle-fill "
                          : data.status === "Rejected"
                          ? "bi bi-x-circle-fill "
                          : "bi-hourglass-split"
                      }`}></span>
                    </span>
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
}

export default JobseekerView;
