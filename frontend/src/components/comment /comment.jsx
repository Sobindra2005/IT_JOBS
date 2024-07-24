import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Success, Error } from "../popup/popup";
import { Getpost } from "../../api/home";
import { useNavigate } from "react-router-dom";
import { postComment } from "../../api/comment";
import { socket } from "../../socket";
import { timeCalculate } from "../functions/function";
import { GetUserById } from "../../api/getuser";

function Comment(props) {
  const [like, setLike] = useState([]);
  const [dislike, setDislike] = useState([]);
  const [commentLike, setCommentLike] = useState([]);
  const [commentDislike, setCommentDislike] = useState([]);
  const [comment, setComment] = useState("");
  const [allcomment, setallcomment] = useState([]);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const backhandle = () => {
    props.setcomment(false);
  };

  const getuser = async (id) => {
    try {
      const response = await GetUserById(id);
      if (response && response.data) {
        return response.data;
      } else {
        console.log("No data property on response object");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const postcomment = async (id) => {
    if (!!comment) {
      const responce = await postComment(
        id,
        comment,
        props.authenticatedUserDetails._id
      );
  
     
      socket.emit("send comment", {
        postId: props.commentPost._id,
        userId: props.authenticatedUserDetails._id,
      });
     
      setComment("");
    }
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

  const fetchUserNames = async (allcomments) => {

    const commentsWithUsernames = await Promise.all(
      allcomments.map(async (comment) => {
        const user = await getuser(comment.UserId);
    
        return {
          ...comment,
          userName: `${user[0].firstName} ${user[0].lastName}`,
        };
      })
    );
    setallcomment(commentsWithUsernames);
  };
 

  useEffect(() => {
    socket.on("receive comment", async (data) => {
     fetchUserNames(data)
    });
    socket.emit("join comment", props.commentPost._id);
  
    return () => {
      socket.off("comments data");
    };
  }, [props.commentPost._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [getCurrentTime]);


  return (
    <>
      <section className="  fixed border  w-[100%] bg-gray-400 m-auto  mt-2 text-center h-auto  pt-16">
        <div className="   overflow-y-auto overflow-x-hidden  bg-white mb-10 mt-1 Job-list-section flex-1 h-[82vh] w-[40%] m-auto flex flex-col px-4 border border-t-purple-200 shadow-xl">
          <div className="sticky z-50 top-0 mb-4 pb-1 py-1 flex justify-end w-full bg-white">
            <div className="flex w-screen  justify-between items-center cursor-pointer">
              <span className="  relative text-black text-xl flex-1 text-center">
                {props.commentPost.firstName} {props.commentPost.lastName}'s
                post
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
                    ? `${props.commentPost.AuthorImgSrc}`
                    : "https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                }
                alt=""
              />
              <div className="flex flex-col pl-3 cursor-pointer">
                <p className="text-base font-medium">
                  {props.commentPost.firstName || props.commentPost.lastName
                    ? `${props.commentPost.firstName} ${props.commentPost.lastName} `
                    : "Unknown User"}
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
                  expandedPosts[props.commentPost._id]
                    ? "hidden"
                    : "block line-clamp-2"
                }`}
              >
                <b>Job Title:</b> {props.commentPost.jobTitle} <br />
                <b>Company Name:</b> {props.commentPost.companyName} <br />
                <b>Salary:</b> {props.commentPost.salary} <br />
                <b>Employment Type:</b> {props.commentPost.employmentType}{" "}
                <br />
                <b>Location:</b> {props.commentPost.location} <br />
              </p>
              <p className="text-base text-gray-900 block">
                <b>Job Title:</b> {props.commentPost.jobTitle} <br />
                <b>Company Name:</b> {props.commentPost.companyName} <br />
                <b>Salary:</b> {props.commentPost.salary} <br />
                <b>Employment Type:</b> {props.commentPost.employmentType}{" "}
                <br />
                <b>Location:</b> {props.commentPost.location} <br />
              </p>
            </div>
          ) : (
            <div className="px-1 pb-2 pt-2 text-left cursor-pointer">
              <p className="text-base text-gray-900 block">
                <b>Job Title:</b> {props.commentPost.jobTitle} <br />
                <b>Company Name:</b> {props.commentPost.companyName} <br />
                <b>Salary:</b> {props.commentPost.salary} <br />
                <b>Employment Type:</b> {props.commentPost.employmentType}{" "}
                <br />
                <b>Location:</b> {props.commentPost.location} <br />
              </p>
            </div>
          )}

          {/* Joblist Apply and React Section */}
          <div className="p-1 border-y border-gray-500 flex items-center justify-between">
            <div className="flex w-[35%] justify-between items-center text-lg">
              {/* Like Button */}
              <button
                onClick={() => handleLike(props.commentPost._id)}
                className={` rounded-md   justify-center px-2 py-1 shadow-sm shadow-slate-600 pl-3 flex items-center ${
                  like[props.commentPost._id]
                    ? "text-gray-800"
                    : "text-gray-500"
                } focus:outline-none`}
              >
                <i className={`fas fa-thumbs-up  mr-1.5`}></i>
                <span
                  className={`text-sm ${
                    like[props.commentPost._id]
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  like
                </span>
              </button>

              {/* Dislike Button */}
              <button
                onClick={() => handleDislike(props.commentPost._id)}
                className={`rounded-md justify-center px-2 py-1 shadow-sm shadow-slate-600 w-[fit-content] flex items-center ${
                  dislike[props.commentPost._id]
                    ? "text-gray-800"
                    : "text-gray-500"
                } focus:outline-none`}
              >
                <i className={`fas fa-thumbs-down mr-1.5`}></i>
                <span
                  className={`text-sm ${
                    dislike[props.commentPost._id]
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  dislike
                </span>
              </button>
            </div>

            {/* Comment Button */}
            <button className="rounded-md justify-center px-2 py-1 shadow-sm shadow-slate-600 w-[fit-content] flex text-gray-800 mr-2 items-center focus:outline-none">
              <i className="bi  bi-chat-dots-fill text-xl comment-icon"></i>
              <span className={`text-sm text-gray-800`}>comments</span>
            </button>

            <div className="w-1/4">
              <button
                onClick={() => props.jobapplyhandle(props.commentPost.AuthorId)}
                className="rounded-md justify-center px-2 py-1 shadow-sm text-gray-700 shadow-gray-500 font-semibold focus:outline-none"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Comment Section */}
          {allcomment.length > 0 ? (
            allcomment.map((newcomment) => (
              <div
                key={newcomment._id}
                className="flex flex-col items-start w-full"
              >
                <div className="flex h-auto py-4 max-w-[100%]">
                  <img
                    className="h-11 w-11 flex-none rounded-full object-cover object-center"
                    src="https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                    alt="Avatar"
                  />
                  <div className="flex leading-none flex-col text-left">
                    <div className="w-full border leading-none border-gray-300 rounded-xl pl-4 px-4 py-2  text-gray-800 text-left ml-2">
                      <h2 className=" text-base text-black ">
                        {newcomment.userName}
                        <span className="normal-case bi bi-dot text-[12px] text-gray-400">
                          {timeCalculate(newcomment.createdAt)}
                        </span>
                      </h2>
                      <span className="text-gray-700 ">
                        {newcomment.comment}
                      </span>
                    </div>
                    <div className="p-1 ml-2 flex justify-between w-[full]">
                      <span
                        onClick={() => handleCommentLike(newcomment._id)}
                        className={`cursor-pointer ${
                          commentLike[newcomment._id]
                            ? "bi bi-hand-thumbs-up-fill"
                            : "bi bi-hand-thumbs-up"
                        } text-sm`}
                      ></span>
                      <span
                        onClick={() => handleCommentDislike(newcomment._id)}
                        className={`cursor-pointer ${
                          commentDislike[newcomment._id]
                            ? "bi bi-hand-thumbs-down-fill"
                            : "bi bi-hand-thumbs-down"
                        } text-sm`}
                      ></span>
                      <span className="cursor-pointer text-sm">Reply</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-700 my-14 "> No comments to show </div>
          )}

          <div className="flex z-50 w-full sticky bottom-0  h-auto border ">
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
            <i
              onClick={() => postcomment(props.commentPost._id)}
              className="bi bi-send-fill rotate-45 flex items-center cursor-pointer ml-2"
            ></i>
          </div>
        </div>
      </section>
    </>
  );
}

export default Comment;
