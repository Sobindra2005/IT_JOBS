import React, { useEffect, useState } from "react";
import axios from "axios";
import { Success, Error } from "./popup/popup";
import { Getpost } from "../api/home";

function Homecontent(props) {
  const [responses, setResponses] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});

  async function getpost() {
    const response = await Getpost();
    console.log(response);
    setResponses(response.data);
  }

  useEffect(() => {
    getpost();
  }, []);

  const toggleContent = (id) => {
    setExpandedPosts((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <section className="main-content w-2/4 mt-2 text-center h-auto m-auto pt-16">
        {/* job post component */}
        <div className="new-job-post bg-white rounded-full border border-t-gray-200 shadow-xl w-11/12 m-auto flex flex-row">
          {/* top first component */}
          <div className="p-2 px-5 justify-between w-screen flex flex-row">
            <div className="flex cursor-pointer">
              <img
                className="h-12 w-12 flex-none border border-gray-300 rounded-full object-cover object-center"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH6_3LEQ3Mt1Or0Zx53Yoyi-5qzZ55DdxVng&s"
                alt=""
              />
              <p className="flex items-center font-medium pl-3 text-xl">
                {props.authenticatedUserDetails.firstName}{" "}
                {props.authenticatedUserDetails.lastName}
              </p>
            </div>
            <div className="mt-2">
              <button
                type="button"
                onClick={props.showJobposthandle}
                className="ml-12 shadow-md rounded-md h-8 px-2 text-white items-center bg-purple-900 hover:bg-purple-800 font-semibold"
              >
                Create Job
              </button>
            </div>
          </div>
        </div>

        {/* separated line */}
        <div className="border border-b-1 w-11/12 m-auto mt-4 border-gray-400"></div>

        {responses.length > 0 ? (
          responses.map((response) => (
            <div
              key={response._id}
              className="bg-white mb-10 mt-4 Job-list-section flex-1 h-auto w-post-width m-auto rounded-3xl flex flex-col p-4 border border-t-purple-200 shadow-xl"
            >
              {/* jobList top section */}
              <div className="pb-3 flex flex-row justify-between">
                <div className="flex flex-row cursor-pointer">
                  <img
                    className="h-11 w-11 flex-none rounded-full object-cover object-center"
                    src={
                      response.AuthorImgSrc ? `${response.AuthorImgSrc}` : "https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                    }
                    alt=""
                  />
                  <div className="flex flex-col pl-3 cursor-pointer">
                    <p className="text-base font-medium">
                      {response.firstName
                        ? `${response.firstName} ${response.lastName}`
                        : "Unknown User"}
                    </p>
                    <p className="text-xs text-left text-gray-500 font-medium">
                      1d
                    </p>
                  </div>
                </div>
                <div className="text-gray-600 cursor-pointer">
                  <i className="bi bi-three-dots hover:bg-gray-300 text-xl rounded-xl p-1"></i>{" "}
                  <i className="bi bi-x text-2xl hover:bg-gray-300 p-0.5 rounded-xl"></i>
                </div>
              </div>
              {/* joblist content section */}

              {response.ImgSrc ? (
                <img
                  src={`${response.ImgSrc}`}
                  alt="random"
                  className="shadow-inner border border-b-gray-200 w-full m-auto min-w-0 h-96 rounded-2xl object-cover object-center"
                />
              ) : (
                ""
              )}

              {/* Job overview section */}
              {response.ImgSrc ? (
                <div
                  className="px-1 pt-2 text-left cursor-pointer"
                  onClick={() => toggleContent(response._id)}
                >
                  <p
                    className={`text-base text-gray-900 ${
                      expandedPosts[response._id]
                        ? "hidden"
                        : "block line-clamp-2"
                    }`}
                  >
                    <b>Job Title:</b> {response.jobTitle} <br />
                    <b>Company Name:</b> {response.companyName} <br />
                    <b>Salary:</b> {response.salary} <br />
                    <b>Employment Type:</b> {response.employmentType} <br />
                    <b>Location:</b> {response.location} <br />
                  </p>
                  <p
                    className={`text-base text-gray-900 ${
                      expandedPosts[response._id] ? "block" : "hidden"
                    }`}
                  >
                    <b>Job Title:</b> {response.jobTitle} <br />
                    <b>Company Name:</b> {response.companyName} <br />
                    <b>Salary:</b> {response.salary} <br />
                    <b>Employment Type:</b> {response.employmentType} <br />
                    <b>Location:</b> {response.location} <br />
                  </p>
                </div>
              ) : (
                <div className="px-1 pt-2 text-left cursor-pointer">
                  <p className="text-base text-gray-900 block ">
                    <b>Job Title:</b> {response.jobTitle} <br />
                    <b>Company Name:</b> {response.companyName} <br />
                    <b>Salary:</b> {response.salary} <br />
                    <b>Employment Type:</b> {response.employmentType} <br />
                    <b>Location:</b> {response.location} <br />
                  </p>
                </div>
              )}

              <div className="border border-b-1 w-full m-auto mt-4 border-gray-400"></div>

              {/* joblist apply and react section */}
              <div className="flex flex-row justify-between px-6 pt-2">
                <div className="space-x-2.5 text-2xl">
                  <i className="fas fa-thumbs-up text-2xl"></i>
                  <span className="border-r-2 border-pink-500 text-sm pr-2 text-zinc-800">
                    100k Likes
                  </span>
                  <i className="fas fa-thumbs-down pl-2 text-2xl"></i>
                </div>
                <div>
                  <button
                    onClick={props.jobapplyhandle}
                    type="submit"
                    className="border py-1 px-3 rounded-md bg-notification hover:bg-pink-700 text-white"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No job posts available</p>
        )}
      </section>
    </>
  );
}

export default Homecontent;
