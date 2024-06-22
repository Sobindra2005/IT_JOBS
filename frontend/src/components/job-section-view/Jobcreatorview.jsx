import { useEffect, useState } from "react";
import jobData from "../../demodata/jobList";

function Jobcreator() {
  const [datas, setdatas] = useState([]);
  useEffect(() => {
    setdatas(jobData);
  }, []);

  return (
    <>
      <section className="main-content w-3/5 z-8 mt-16 p-8 text-center  border-t-2 border-gray-300  shadow-xl h-auto m-auto pt-16">
        <h1 className="text-2xl text-left font-semibold ">Job Lists</h1>
        {/* job lists overview */}

        <div className="border-t-2  border-black mt-2 ">
          {datas.map((data, index) => (
            <>
              <div className="mt-3 p-4 flex flex-row justify-between rounded-3xl w-full shadow shadow-zinc-400 ">
                <div className="flex flex-row ">
                  <img
                    className="h-14 w-14 object-center object-cover border border-gray-700 p-0.5 flex-none rounded-full bg-gray-50"
                    src={data.picUrl}
                    alt=""
                  />
                  <h1 className=" pl-3 flex text-base font-semibold items-center ">
                    {data.jobTitle}
                  </h1>
                </div>
                {/* date of post */}
                <p className=" flex items-center text-sm text-gray-600 ">
                  {data.dateOfPost}
                </p>
                <button
                  type="submit"
                  className=" flex items-center font-medium text-base text-gray-300 hover:bg-blue-400 bg-blue-500 px-2 h-10 shadow-md shadow-black rounded-lg "
                >
                  {data.numberOfApplicants} <i className="bi bi-eye pl-2 "></i>
                </button>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
}

export default Jobcreator;
