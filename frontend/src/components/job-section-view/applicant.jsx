import { useEffect, useState } from "react";
import profileData from "../../demodata/profiledata";

function Applicant() {
  const [datas, setdatas] = useState([]);
  useEffect(() => {
    setdatas(profileData);
  }, []);

  return (
    <>
      <section className="main-content w-3/5 z-8 mt-16 p-8 text-center  border-t-2 border-gray-300  shadow-xl h-auto m-auto pt-16">
        <h1 className="text-2xl text-left font-semibold ">Applicant Lists</h1>
        {/* job lists overview */}

        <div className="border-t-2  border-black mt-2 ">
          {datas.map((data, index) => (
            <>
              <div className="mt-3 p-4 flex flex-row justify-between rounded-3xl w-full shadow shadow-zinc-400 ">
                <div className="flex flex-row ">
                  <img
                    className="h-14 w-14 object-center object-cover border border-gray-700 p-0.5 flex-none rounded-full bg-gray-50"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYdAdQnrVDOSNpvaWU3ZGrH5gfngFCGZimcQ&s"
                    alt=""
                  />
                  <h1 className=" pl-3 flex text-base font-semibold items-center ">
                    {data.name}
                  </h1>
                </div>
                {/* date of post */}
{/* view profile button */}
                <button
                  type="submit"
                  className=" flex items-center font-medium text-base bg-notification text-white  px-2 h-9 rounded-md  shadow-md "
                >
                  <i className="bi bi-eye pr-2 "></i> View Profile
                </button>

{/* accept and reeject button */}
                <div className="flex flex-row space-x-4 ">
                  <button
                    type="submit"
                    className=" flex items-center font-medium text-base bg-red-800 text-white  px-2 h-9 rounded-md  shadow-md "
                  ><i className="bi bi-x-circle pr-1 "></i> Reject</button>
                   <button
                    type="submit"
                    className=" flex items-center font-medium text-base bg-yellow-700 text-white  px-2 h-9 rounded-md  shadow-md "
                  ><i className="bi bi-check-circle pr-1 "></i> Accept</button>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
}

export default Applicant;
