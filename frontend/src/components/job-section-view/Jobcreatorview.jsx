import { useEffect, useState } from "react";
import { Job } from "../../api/jobview/jobcreator";
import { getApplicants } from "../../api/jobview/jobcreator";

function Jobcreator(props) {
  const [view, setview] = useState("my-post");
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    if (view == "my-post") {
      props.setJobView(true);
    }
    if (view == "applied-jobs") {
      props.setJobView(false);
    }
  }, [view]);

  const getJobs = async () => {
    const jobs = await Job();
    setjobs(jobs.data);
  };
  useEffect(() => {
    getJobs();
  }, []);

  const storeApplicantList = async (postId) => {
    const responce = await getApplicants(postId);
    const data = responce.data;
    return data;
  };
  const showApplicants = async (postId) => {
    await props.setapplicant(true);
    const data = await storeApplicantList(postId);
    props.setApplicantList(data);
  };
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

        <h1 className="text-2xl text-left font-semibold ">Job Lists({jobs.length})</h1>
        {/* job lists overview */}

        <div className="border-t-2  border-black mt-2 ">
          {/* Top bar  */}
          <div className=" mt-2 text-gray-600 text-md  px-2 pl-10 flex justify-between ">
            <div>jobs Titles </div>
            <div className="flex ">
              <div className="mr-20 ">dates of posts</div>
              <div className="normal-case ">Number of Applicants </div>
            </div>
          </div>
          {jobs.map((data, index) => (
            <>
              <div
                key={data._id}
                onClick={() => showApplicants(data._id)}
                className="mt-3 cursor-pointer hover:bg-gray-200 p-4 flex flex-row justify-between rounded-xl w-full shadow shadow-zinc-400 "
              >
                <div className="flex flex-row ">
                  <span className="flex items-center"> {index + 1}.</span>
                  <h1 className=" pl-3 flex text-base font-semibold items-center ">
                    {data.jobTitle}
                  </h1>
                </div>
                <div className="flex h-full ">
                  {/* date of post */}
                  <p className=" flex items-center mr-[9rem] text-sm text-gray-600 ">
                    {`${new Date(data.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}
                  </p>

                  <button
                    type="submit"
                    className=" flex items-center mr-6 justify-center font-medium text-base hover:bg-sky-700 bg-sky-800   text-white  p-2 h-7 w-16  shadow-md "
                  >
                    <span className="ml-2 flex justify-center leading-none w-full ">
                      {data.applicants === 0
                        ? ` 0`
                        : data.applicants === 1
                        ? ` 1 `
                        : ` ${data.applicants} `}
                      <span className=" bi bi-people-fill pl-2 "></span>
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
