import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Success, Error } from "../popup/popup";
import { Getpost } from "../../api/home";
import { useNavigate } from "react-router-dom";

function Comment(props) {
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);
  const [commentLike, setCommentLike] = useState([]);
  const [commentDislike, setCommentDislike] = useState([]);
  const [comment, setComment] = useState("");
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const backhandle = () => {
   props.setcomment(false)
  };

  const getCurrentTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const seconds = now.getSeconds();
    return { hours, seconds };
  }, []);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";

    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const timeCalculate = (timestamps) => {
    const now = new Date();
    const upload = new Date(timestamps);
    const diff = now - upload;
    const second = Math.floor(diff / 1000);
    const minute = Math.floor(second / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);

    if (day > 0) return `${day} days ago`;
    if (hour > 0) return `${hour} hours ago`;
    if (minute > 0) return `${minute} minutes ago`;
    return `${second} seconds ago`;
  };

  const handleCommentLike = (id) => {
    setCommentLike((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setCommentDislike((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleCommentDislike = (id) => {
    setCommentDislike((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setCommentLike((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleLike = (id) => {
    setLike((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setDislike((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleDislike = (id) => {
    setDislike((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setLike((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  useEffect(() => {
    handleInput(); // Auto-resize on component mount
  }, [comment]);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [getCurrentTime]);

  return (
    <>
   
      <section className="  fixed border border-black w-[100%] bg-gray-400 m-auto  mt-2 text-center h-auto  pt-16">
        <div className=" overflow-y-auto overflow-x-hidden  bg-white mb-10 mt-1 Job-list-section flex-1 h-[82vh] w-[40%] m-auto flex flex-col px-4 border border-t-purple-200 shadow-xl">
          <div className="sticky top-0 mb-4 pb-1 py-1 flex justify-end w-full bg-white">
            <div className="flex w-[66.66%] justify-between cursor-pointer">
              <span className="font-semibold text-gray-800 text-lg">
                {props.commentPost.firstName} {props.commentPost.lastName}'s post
              </span>
              <i
                onClick={() => backhandle()}
                className="bi bi-x text-gray-600 text-2xl hover:bg-gray-300 flex p-1 rounded-full"
              ></i>
            </div>
          </div>

          {/* Job List Top Section */}
          <div className="pb-3 flex flex-row border-t pt-4 border-gray-500 justify-between">
            <div className="flex flex-row cursor-pointer">
              <img
                className="h-11 w-11 flex-none rounded-full object-cover object-center"
                src={
               props.commentPost.AuthorImgSrc
                    ? `${  props.commentPost.AuthorImgSrc}`
                    : "https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                }
                alt=""
              />
              <div className="flex flex-col pl-3 cursor-pointer">
                <p className="text-base font-medium">
                  { props.commentPost.firstName || props.commentPost.lastName  ? `${props.commentPost.firstName} ${props.commentPost.lastName} ` : "Unknown User"}
                </p>
                <p className="text-xs text-left text-gray-500 font-medium">
                  {`${timeCalculate(props.commentPost?.createdAt)}`}
                </p>
              </div>
            </div>
            <div className="text-gray-600 cursor-pointer">
              <i className="bi bi-three-dots hover:bg-gray-300 px-1 text-xl rounded-full p-1"></i>
            </div>
          </div>

          {/* Joblist Content Section */}
          {props.commentPost.ImgSrc ? (
            <img
              src={`${props.commentPost.ImgSrc}`}
              alt="random"
              className="shadow-inner border border-b-gray-200 w-full m-auto min-w-0 h-96 rounded-2xl object-cover object-center"
            />
          ) : null}

          {/* Job Overview Section */}
          {props.commentPost.ImgSrc ? (
            <div
              className="px-1 pb-2 pt-2 text-left cursor-pointer"
              onClick={() => toggleContent(props.commentPost._id)}
            >
              <p
                className={`text-base text-gray-900 ${
                  expandedPosts[props.commentPost._id] ? "hidden" : "block line-clamp-2"
                }`}
              >
                <b>Job Title:</b> {props.commentPost.jobTitle} <br />
                <b>Company Name:</b> {props.commentPost.companyName} <br />
                <b>Salary:</b> {props.commentPost.salary} <br />
                <b>Employment Type:</b> {props.commentPost.employmentType} <br />
                <b>Location:</b> {props.commentPost.location} <br />
              </p>
              <p className="text-base text-gray-900 block">
                <b>Job Title:</b> {props.commentPost.jobTitle} <br />
                <b>Company Name:</b> {props.commentPost.companyName} <br />
                <b>Salary:</b> {props.commentPost.salary} <br />
                <b>Employment Type:</b> {props.commentPost.employmentType} <br />
                <b>Location:</b> {props.commentPost.location} <br />
              </p>
            </div>
          ) : (
            <div className="px-1 pb-2 pt-2 text-left cursor-pointer">
              <p className="text-base text-gray-900 block">
                <b>Job Title:</b> {props.commentPost.jobTitle} <br />
                <b>Company Name:</b> {props.commentPost.companyName} <br />
                <b>Salary:</b> {props.commentPost.salary} <br />
                <b>Employment Type:</b> {props.commentPost.employmentType} <br />
                <b>Location:</b> {props.commentPost.location} <br />
              </p>
            </div>
          )}

          {/* Joblist Apply and React Section */}
          <div className="p-1 border-y border-gray-500 flex items-center justify-between">
            <div className="flex w-3/4 items-center text-lg">
              {/* Like Button */}
              <button
                onClick={() => handleLike(props.commentPost._id)}
                className={`w-2/5 flex items-center ${
                  like[props.commentPost._id] ? "text-gray-800" : "text-gray-500"
                } focus:outline-none`}
              >
                <i
                  className={`fas fa-thumbs-up ${
                    like[props.commentPost._id] ? "scale-125" : ""
                  } mr-1.5`}
                ></i>
                <span className={`${like[props.commentPost._id] ? "text-gray-800" : ""}`}>
                  Likes
                </span>
              </button>

              {/* Dislike Button */}
              <button
                onClick={() => handleDislike(props.commentPost._id)}
                className={`w-2/5 flex items-center ${
                  dislike[props.commentPost._id] ? "text-gray-800" : "text-gray-500"
                } focus:outline-none`}
              >
                <i
                  className={`fas fa-thumbs-down ${
                    dislike[props.commentPost._id] ? "scale-125" : ""
                  } mr-1.5`}
                ></i>
                <span className={`${dislike[props.commentPost._id] ? "text-gray-800" : ""}`}>
                  Dislikes
                </span>
              </button>
            </div>

            {/* Comment Button */}
            <button className="w-2/5 flex text-gray-800 mr-2 items-center focus:outline-none">
              <i className="bi bi-chat-dots-fill scale-125 text-xl comment-icon"></i>
              <span className="pl-1 text-gray-800">Comments</span>
            </button>

            <div className="w-1/4">
              <button
                onClick={() => props.jobapplyhandle(props.commentPost.AuthorId)}
                className="border py-1 px-3 rounded-md bg-notification hover:bg-blue-900 text-white focus:outline-none"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Comment Section */}
          <div className="flex flex-col items-start w-full">
            <div className="flex h-auto py-4 max-w-[80%]">
              <img
                className="h-11 w-11 flex-none rounded-full object-cover object-center"
                src="https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                alt="Avatar"
              />
              <div className="flex leading-none flex-col text-left">
                <div className="w-full border border-gray-300 rounded-xl pl-1.5 py-2 leading-tight text-gray-800 text-left ml-2">
                  <h2 className="font-semibold text-gray-900">John Doe</h2>
                  hlo Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eum ducimus corrupti amet officia, odit nam minima assumenda
                  veritatis molestias fuga.
                </div>
                <div className="p-1 ml-2 flex justify-between w-[60%]">
                  <span
                    onClick={() => handleCommentLike(4545)}
                    className={`cursor-pointer ${
                      commentLike[4545]
                        ? "bi bi-hand-thumbs-up-fill"
                        : "bi bi-hand-thumbs-up"
                    } text-sm`}
                  >
                    Like
                  </span>
                  <span
                    onClick={() => handleCommentDislike(4545)}
                    className={`cursor-pointer ${
                      commentDislike[4545]
                        ? "bi bi-hand-thumbs-down-fill"
                        : "bi bi-hand-thumbs-down"
                    } text-sm`}
                  >
                    Dislike
                  </span>
                  <span className="cursor-pointer text-sm">Reply</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full sticky bottom-0 h-auto">
            <textarea
              type="text"
              value={comment}
              spellCheck={false}
              className="resize-none rounded-lg max-h-36 flex-1 normal-case outline-none p-2 border border-gray-400 bg-white"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment...."
              name="comment"
              id="comment"
              ref={textareaRef}
            />
            <i className="bi bi-send-fill rotate-45 flex items-center cursor-pointer ml-2"></i>
          </div>
        </div>
       
      </section>
    </>
  );
}

export default Comment;
