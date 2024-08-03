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
import { Follow, Unfollow } from "../api/followHandle";
import { Notifylike, Notifydislike } from "../api/Notifications";

function Homecontent(props) {
  const [responses, setResponses] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [like, setlike] = useState([]);
  const [dislike, setdislike] = useState([]);
  const navigate = useNavigate();
  const getCurrentTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const seconds = now.getSeconds();
    return { hours, seconds };
  }, []);

  const addlike = async (postId, authorId, jobtitle) => {
    console.log("add like ");
    const responce = await Addlike(postId);

    if (responce.status === 200) {
      const updatedResponce = await responses.map((response) => {
        return response._id === responce.data[0]._id
          ? responce.data[0]
          : response;
      });
      setResponses(updatedResponce);
    }

    const notifyresponce = await Notifylike(
      authorId,
      props.authenticatedUserDetails._id,
      jobtitle
    );
    console.log(notifyresponce);
    if (
      notifyresponce.status == 200 &&
      authorId == props.authenticatedUserDetails._id
    ) {
      socket.emit("identify notification", authorId);
    }
  };

  const removelike = async (postId) => {
    console.log("here is remove like");
    const responce = await Removelike(postId);
    if (responce.status === 200) {
      const updatedResponce = responses.map((response) => {
        return response._id === responce.data[0]._id
          ? responce.data[0]
          : response;
      });
      setResponses(updatedResponce);
    }
  };

  const addDislike = async (postId, authorId, jobtitle) => {
    console.log("add dislike ");
    const responce = await AddDislike(postId);
    if (responce.status === 200) {
      const updatedResponce = responses.map((response) => {
        return response._id === responce.data[0]._id
          ? responce.data[0]
          : response;
      });
      setResponses(updatedResponce);
    }

    const notifyresponce = await Notifydislike(
      authorId,
      props.authenticatedUserDetails._id,
      jobtitle
    );
    console.log(notifyresponce);
    if (
      notifyresponce.status == 200 &&
      authorId == props.authenticatedUserDetails._id
    ) {
      socket.emit("identify notification", authorId);
    }
  };

  const removedislike = async (postId) => {
    console.log("remove dislike ");
    const responce = await removeDislike(postId);
    if (responce.status === 200) {
      const updatedResponce = responses.map((response) => {
        return response._id === responce.data[0]._id
          ? responce.data[0]
          : response;
      });
      setResponses(updatedResponce);
    }
  };
 

  async function getpost() {
    const response = await Getpost();
    setResponses(response.data);
  }

  const handleLike = async (postId, authorId, jobtitle) => {
    const post = responses.find((response) => response._id === postId);

    if (!!post) {
      if (post.likes.includes(props.authenticatedUserDetails._id)) {
        await removelike(postId);
      } else {
        await addlike(postId, authorId, jobtitle);
        await removedislike(postId);
      }
    }
  };

  const handledislike = async (postId, authorId, jobtitle) => {
    const post = responses.find((response) => response._id === postId);

    if (post) {
      if (post.dislikes.includes(props.authenticatedUserDetails._id)) {
        await removedislike(postId);
      } else {
        await addDislike(postId, authorId, jobtitle);
        await removelike(postId);
      }
    }
  };

  useEffect(() => {
    getpost();
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

  //follow Handle

  const followHandle = async (userId) => {
    const responce = await Follow(userId);
    console.log(responce);
  };

  const unfollowHandle = async (userId) => {
    const responce = await Unfollow(userId);
    console.log(responce);
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
                      response?.AuthorImgSrc
                        ? `${response?.AuthorImgSrc}`
                        : "https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                    }
                    alt=""
                  />

                  <div className="flex flex-col pl-3 cursor-pointer">
                    <p className="text-lg font-medium">
                      {response.firstName
                        ? `${response.firstName} ${response.lastName}`
                        : "Unknown User"}
                      {response.AuthorId ===
                      props.authenticatedUserDetails._id ? (
                        ""
                      ) : (
                        <span>
                          <button
                            className={`bg-blue-900
                           ml-3 text-sm text-white px-2 rounded-sm shadow-md `}
                          >
                            {false ? "Unfollow" : "Follow"}
                          </button>
                        </span>
                      )}
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
                    <b>Salary:</b> Rs.{response.salary} <br />
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
                    <b>Salary:</b> Rs.{response.salary} <br />
                    <b>Employment Type:</b> {response.employmentType} <br />
                    <b>Location:</b> {response.location} <br />
                  </p>
                </div>
              ) : (
                <div className="px-1 pt-2 text-left cursor-pointer">
                  <p className="text-base text-gray-900 block ">
                    <b>Job Title:</b> {response.jobTitle} <br />
                    <b>Company Name:</b> {response.companyName} <br />
                    <b>Salary:</b> Rs.{response.salary} <br />
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
                    onClick={() =>
                      handleLike(
                        response._id,
                        response.AuthorId,
                        response.jobTitle
                      )
                    }
                    className={`rounded-md flex-1   justify-center px-2 py-1 shadow-sm shadow-slate-600 pl-3 flex items-center ${
                      response.likes.includes(
                        props.authenticatedUserDetails._id
                      )
                        ? "text-gray-800"
                        : "text-gray-500"
                    } focus:outline-none`}
                  >
                    <i
                      className={` ${
                        response.likes.includes(
                          props.authenticatedUserDetails._id
                        )
                          ? "text-gray-800"
                          : "text-gray-500"
                      }  fas fa-thumbs-up  mr-1.5`}
                    ></i>
                    <span
                      className={` flex  ${
                        response.likes.includes(
                          props.authenticatedUserDetails._id
                        )
                          ? "text-black "
                          : "text-gray-500"
                      }  mr-1.5 text-sm `}
                    >
                      {response.likes.length == 0
                        ? "like"
                        : response.likes.length == 1
                        ? " 1 like"
                        : ` ${response.likes.length} likes`}
                    </span>
                  </button>

                  {/* Dislike Button */}
                  <button
                    onClick={() =>
                      handledislike(
                        response._id,
                        response.AuthorId,
                        response.jobTitle
                      )
                    }
                    className={` rounded-md  justify-center px-2 py-1 shadow-sm shadow-slate-600 pl-3 flex items-center  ${
                      response.dislikes.includes(
                        props.authenticatedUserDetails._id
                      )
                        ? "text-black"
                        : "text-gray-500"
                    } focus:outline-none`}
                  >
                    <i className={`fas fa-thumbs-down  mr-1.5`}></i>
                    <span
                      className={` ${
                        response.dislikes.includes(
                          props.authenticatedUserDetails._id
                        )
                          ? "text-black"
                          : "text-gray-500"
                      }  mr-1.5 text-sm`}
                    >
                      {response.dislikes.includes(
                        props.authenticatedUserDetails._id
                      ) &&
                        (response.dislikes.length == 0
                          ? "dislike"
                          : response.dislikes.length == 1
                          ? " 1 dislike"
                          : ` ${response.dislikes.length} dislikes`)}
                    </span>
                  </button>
                </div>

                {/* comment button */}
                <div className="w-[55%] flex justify-around">
                  <button
                    onClick={() => commentHandle(response)}
                    className="  rounded-md justify-center px-2 py-1 shadow-sm shadow-slate-600  flex text-gray-500 mr-2 items-center focus:outline-none"
                  >
                    <i className="bi bi-chat-dots-fill text-xl comment-icon">
                      {" "}
                    </i>{" "}
                    <span className="pl-1"> Comments</span>
                  </button>
                  {props.authenticatedUserDetails._id == response.AuthorId ? (
                    <div></div>
                  ) : (
                    <div className=" ">
                      <button
                        onClick={() => {
                          props.jobapplyhandle(response.AuthorId, response._id);
                        }}
                        className="rounded- rounded-md justify-center px-2 py-1 shadow-sm text-gray-600 shadow-gray-500 font-semibold focus:outline-none"
                      >
                        Apply
                      </button>
                    </div>
                  )}
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
