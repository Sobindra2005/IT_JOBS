import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Success, Error } from "./popup/popup";
import { Getpost } from "../api/home";
import { useNavigate } from "react-router-dom";
import { timeCalculate } from "./functions/function";
import { socket } from "../socket";
import {
  Addlike,
  Removelike,
  AddDislike,
  removeDislike,
} from "../api/likeandDislike";

function Homecontent(props) {
  const [responses, setResponses] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [like, setlike] = useState([]);
  const [dislike, setdislike] = useState([]);
  const navigate = useNavigate();
console.log(responses)
  const getCurrentTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const seconds = now.getSeconds();
    return { hours, seconds };
  }, []);

  const addlike = async (postId) => {
    const responce = await Addlike(postId, props.authenticatedUserDetails._id);
  };

  const removelike = async (postId) => {
    const responce = await Removelike(
      postId,
      props.authenticatedUserDetails._id
    );
  };

  const addDislike = async (postId) => {
    const responce = await AddDislike(
      postId,
      props.authenticatedUserDetails._id
    );

    
  };

  const removedislike = async (postId) => {
    const responce = await removeDislike(
      postId,
      props.authenticatedUserDetails._id
    );
   
  };

  async function getpost() {
    const response = await Getpost();
    setResponses(response.data);
  }

  const handleLike = (id) => {
    setlike((prevState) => {
      const isLiked = !prevState[id];

      if (isLiked) {
       
        addlike(id);
        removedislike(id);

        setdislike((prevState) => {
          const updatedDislike = {
            ...prevState,
            [id]: false,
          };
          return updatedDislike;
        });

        const updatedLike = {
          ...prevState,
          [id]: true,
        };

        return updatedLike;
      } else {
        
        removelike(id);
        const updatedLike = {
          ...prevState,
          [id]: false,
        };

        return updatedLike;
      }
    });
  };

  function handledislike(id) {
    setdislike((prevState) => {
      const isdisLiked = !prevState[id];

      if (isdisLiked) {
        addDislike(id);
        removelike(id);
    
        setlike((prevState) => {
          const updatedlike = {
            ...prevState,
            [id]: false,
          };
          return updatedlike;
        });

        const updatedisLike = {
          ...prevState,
          [id]: true,
        };

        return updatedisLike;
      } else {
      
        removedislike(id);
        const updatedisLike = {
          ...prevState,
          [id]: false,
        };
        return updatedisLike;
      }
    });
  }

  useEffect(() => {
    getpost();

    socket.on("post data", (updatedpost) => {
     setResponses(prevPost =>
     prevPost.map(post=>
     post._id == updatedpost._id ? updatedpost : post
     )
     )
    });

return ()=>{
  socket.off('post data')
}
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      timeCalculate();
      getCurrentTime;
    }, 1000);

    return () => clearInterval(interval);
  }, [getCurrentTime]);

  const toggleContent = (id) => {
    setExpandedPosts((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const commentHandle = (post) => {
    props.commenthandle(post);
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
          responses.map((response, index) => (
            <div
              key={index}
              className="bg-white mb-10 mt-4 Job-list-section flex-1 h-auto w-post-width m-auto rounded-3xl flex flex-col p-4 border border-t-purple-200 shadow-xl"
            >
              {/* jobList top section */}
              <div className="pb-3 flex flex-row justify-between">
                <div className="flex flex-row cursor-pointer">
                  <img
                    className="h-11 w-11 flex-none rounded-full object-cover object-center"
                    src={
                      response.AuthorImgSrc
                        ? `${response.AuthorImgSrc}`
                        : "https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
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
                      {`${timeCalculate(response?.createdAt)}`}
                    </p>
                  </div>
                </div>
                <div className="text-gray-600 cursor-pointer">
                  <i className="bi bi-three-dots hover:bg-gray-300 text-xl rounded-md p-1"></i>{" "}
                  <i className="bi bi-x text-2xl hover:bg-gray-300 p-0.5 rounded-md"></i>
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
              <div className="p-1 border-t border-gray-400 flex items-center justify-between">
                <div className="flex  items-center space-x-6 text-lg">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(response._id)}
                    className={`rounded-md flex-1   justify-center px-2 py-1 shadow-sm shadow-slate-600 pl-3 flex items-center ${
                      like[response._id] ? "text-gray-800" : "text-gray-500"
                    } focus:outline-none`}
                  >
                    <i className={`fas fa-thumbs-up  mr-1.5`}></i>
                    <span
                      className={` flex  ${
                        like[response._id] ? "text-black " : "text-gray-500"
                      }  mr-1.5 text-sm `}
                    >
                      {response.likes.length == 0
                        ? "likes"
                        : response.likes.length == 1
                        ? " 1 like"
                        : ` ${response.likes.length} likes`}
                    </span>
                  </button>

                  {/* Dislike Button */}
                  <button
                    onClick={() => handledislike(response._id)}
                    className={` rounded-md  justify-center px-2 py-1 shadow-sm shadow-slate-600 pl-3 flex items-center ${
                      dislike[response._id] ? "text-gray-800" : "text-gray-500"
                    } focus:outline-none`}
                  >
                    <i className={`fas fa-thumbs-down  mr-1.5`}></i>
                    <span
                      className={` ${
                        dislike[response._id] ? "text-black" : "text-gray-500"
                      }  mr-1.5 text-sm`}
                    >
                      {dislike[response._id] &&
                        (response.dislikes.length == 1
                          ? " 1 dislike"
                          : ` ${response.dislikes.length} dislikes`)}
                    </span>
                  </button>
                </div>

                {/* comment button */}
                <button
                  onClick={() => commentHandle(response)}
                  className="  rounded-md justify-center px-2 py-1 shadow-sm shadow-slate-600  flex text-gray-500 mr-2 items-center focus:outline-none"
                >
                  <i className="bi bi-chat-dots-fill text-xl comment-icon"> </i>{" "}
                  <span className="pl-1"> Comments</span>
                </button>

                <div className=" ">
                  <button
                    onClick={() => {
                      props.jobapplyhandle(response.AuthorId);
                    }}
                    className="rounded- rounded-md justify-center px-2 py-1 shadow-sm text-gray-600 shadow-gray-500 font-semibold focus:outline-none"
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
