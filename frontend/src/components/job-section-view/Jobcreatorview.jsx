import { useEffect, useState } from "react";
import jobData from "../../demodata/jobList";

function Jobcreator(props) {
  const [datas, setdatas] = useState([]);
  const [view, setview] = useState("my-post");

  useEffect(() => {
    if (view == "my-post") {
     props.setJobView(true)
    }
    if (view == "applied-jobs") {
      props.setJobView(false)
    }
  }, [view]);
useEffect(()=>{
  setdatas(jobData)
})
  return (
    <>
      <section className="main-content w-3/5 z-8 p-8 mt-3  border-t-2 border-gray-300  shadow-xl h-auto m-auto pt-16">
        <select
          id="view"
          value={view}
          onChange={(e) => setview(e.target.value)}
          className=" custom-select text-xl mb-7 w-[8em] text-gray-600  "
        >
          <option value="my-post">My Post</option>
          <option value="applied-jobs">Applied Jobs</option>
        </select>

        <h1 className="text-2xl text-left font-semibold ">Job Lists</h1>
        {/* job lists overview */}

        <div className="border-t-2  border-black mt-2 ">
          {/* Top bar  */}
          <div className=" mt-2 text-gray-600 text-md  px-2 pl-10 flex justify-between ">
            <div>jobs Title </div>
            <div className="flex ">
              <div className="mr-20 ">dates of post</div>
              <div className="normal-case ">Number of Applicants </div>
            </div>
          </div>
          {datas.map((data, index) => (
            <>
              <div
                key={index}
                className="mt-3 p-4 flex flex-row justify-between rounded-3xl w-full shadow shadow-zinc-400 "
              >
                <div className="flex flex-row ">
                  <span className="flex items-center"> {index + 1}.</span>
                  <h1 className=" pl-3 flex text-base font-semibold items-center ">
                    {data.jobTitle}
                  </h1>
                </div>
                <div className="flex h-full ">
                  {/* date of post */}
                  <p className=" flex items-center mr-24 text-sm text-gray-600 ">
                    24th july, 2024
                  </p>
                  <button
                    type="submit"
                    className=" flex items-center justify-center font-medium text-base bg-sky-800  text-white  p-2 h-10 w-32  shadow-md "
                  >
                    <span className="ml-2 flex justify-center w-full ">
                      23 Applied
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

export default Jobcreator;
