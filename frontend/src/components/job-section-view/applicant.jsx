import { useEffect, useState } from "react";
import { AcceptApi, RejectApi, PendingAPi } from "../../api/jobview/jobcreator";

function Applicant(props) {
  console.log(props.applicantList);
  const hideapplicant = () => {
    props.setapplicant(false);
  };

  const acceptHandle = async (id) => {
    const responce = await AcceptApi(id);
    const updatedResponce = responce.data;
    props.setApplicantList((prev) =>
      prev.map((applicant) =>
        applicant._id === id ? updatedResponce : applicant
      )
    );
  };

  const rejectHandle = async (id) => {
    const responce = await RejectApi(id);
    const updatedResponce = responce.data;
    props.setApplicantList((prev) =>
      prev.map((applicant) =>
        applicant._id === id ? updatedResponce : applicant
      )
    );
  };

  const pendingHandle = async (id) => {
    const responce = await PendingAPi(id);
    const updatedResponce = responce.data;
    props.setApplicantList((prev) =>
      prev.map((applicant) =>
        applicant._id === id ? updatedResponce : applicant
      )
    );
  };

  return (
    <>
      <div className="w-screen h-screen  overflow-scroll pt-10 fixed inset-0 bg-gray-800 bg-opacity-60 z-30 flex justify-center  ">
        <div className=" w-3/5 rounded-xl  shadow-slate-800 z-8 pb-8 text-center bg-white h-[98%] shadow-xl overflow-scroll m-auto ">
          <div className="flex  pt-8 pb-2 px-8 sticky top-0 bg-white   justify-end  ">
            <h1 className="text-2xl w-full flex justify-start font-semibold ">
              Applicants List ({props.applicantList.length})
            </h1>
            <i
              onClick={() => hideapplicant()}
              className="bi bi-x text-2xl cursor-pointer  w-[fit-content] rounded-full p-[5px] hover:text-white flex items-center hover:bg-gray-400 "
            ></i>
          </div>

          <div className="mt-2 border-black border-t-2  px-8">
            {props.applicantList.length > 0 ? (
              props.applicantList.map((data, index) => (
                <>
                  <div
                    key={index}
                    className="mt-3  px-4 py-2 flex flex-row hover:bg-gray-100  cursor-pointer  justify-between rounded-xl w-full shadow shadow-zinc-400 "
                  >
                    <div className="flex flex-row ">
                      <img
                        className="h-14 w-14 cursor-pointer object-center object-cover border border-gray-700 p-0.5 flex-none rounded-full bg-gray-50"
                        src="https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                        alt=""
                      />
                      <h1 className=" pl-3 flex text-base font-semibold items-center ">
                        {`${data.firstName} ${data.lastName}`}
                      </h1>
                      <div className="flex text-[14px] ml-3 items-center text-gray-500 ">
                        {`${new Date(data.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}`}
                      </div>
                    </div>

                    {/* accept and reeject button */}
                    <div className="flex flex-row items-center space-x-4 ">
                      {data.status === "Accepted" ||
                      data.status === "Rejected" ? (
                        <button
                          onClick={() => pendingHandle(data._id)}
                          type="submit"
                          className=" flex items-center justify-center font-medium text-base   p-2 h-10 w-32   "
                        >
                          <span
                            className={`ml-2 flex justify-center w-full ${
                              data.status === "Accepted"
                                ? "text-yellow-500  "
                                : data.status === "Rejected"
                                ? "text-red-800"
                                : ""
                            }`}
                          >
                            {data.status}
                            <span
                              className={`pl-2 ${
                                data.status === "Accepted"
                                  ? " bi bi-check-circle-fill "
                                  : data.status === "Rejected"
                                  ? "bi bi-x-circle-fill "
                                  : ""
                              }`}
                            ></span>
                          </span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => rejectHandle(data._id)}
                            type="submit"
                            className=" flex items-center font-medium text-base bg-red-800 bg-opacity-80 text-white  px-2 h-9 rounded-md  shadow-md "
                          >
                            <i className="bi bi-x-circle pr-1 "></i> Reject
                          </button>
                          <button
                            onClick={() => acceptHandle(data._id)}
                            type="submit"
                            className=" flex items-center font-medium text-base bg-yellow-700 bg-opacity-90 text-white  px-2 h-9 rounded-md  shadow-md "
                          >
                            <i className="bi bi-check-circle pr-1 "></i> Accept
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ))
            ) : (
              <div className="  w-full h-[20rem] flex justify-center items-center text-xl text-gray-600 ">
                No one Apply for This Job Roles
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Applicant;
