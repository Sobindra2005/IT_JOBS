import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Success, Error } from "../popup/popup";
import { Getpost } from "../../api/home";
import { useNavigate } from "react-router-dom";
import { postComment } from "../../api/comment";
import { socket } from "../../socket";
import { timeCalculate } from "../functions/function";
import { GetUserById } from "../../api/getuser";
import {
  Addlike,
  Removelike,
  AddDislike,
  removeDislike,
} from "../../api/likeandDislike";
import {
  cmtlike,
  cmtrmlike,
  cmtdislike,
  cmtrmdislike,
} from "../../api/comment";

function Comment(props) {
  const [comment, setComment] = useState("");
  const [allcomment, setallcomment] = useState([]);
  const [commentPost, setcommentPost] = useState(props.commentPost);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const backhandle = () => {
    props.setcomment(false);
  };

  // handle post
  const addlike = async (postId) => {
    const responce = await Addlike(postId);

    if (responce.status === 200) {
      setcommentPost(responce.data[0]);
    }
  };

  const removelike = async (postId) => {

    const responce = await Removelike(postId);
    if (responce.status === 200) {
      setcommentPost(responce.data[0]);
    }
  };

  const addDislike = async (postId) => {

    const responce = await AddDislike(postId);
    if (responce.status === 200) {
      setcommentPost(responce.data[0]);
    }
  };

  const removedislike = async (postId) => {
   
    const responce = await removeDislike(postId);
    if (responce.status === 200) {
      setcommentPost(responce.data[0]);
    }
  };

  const handleLike = async (postId) => {
    if (!!commentPost) {
      if (commentPost.likes.includes(props.authenticatedUserDetails._id)) {
        await removelike(postId);
      } else {
        await addlike(postId);
        await removedislike(postId);
      }
    }
  };

  const handledislike = async (postId) => {
    if (!!commentPost) {
      if (commentPost.dislikes.includes(props.authenticatedUserDetails._id)) {
        await removedislike(postId);
      } else {
        await addDislike(postId);
        await removelike(postId);
      }
    }
  };

  //get user by id
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

  //comment handle
  const postcomment = async (id) => {
    if (!!comment) {
      console.log("post comment ");
      const responce = await postComment(
        id,
        comment,
        props.authenticatedUserDetails._id
      );

      socket.emit("send comment", {
        postId: props.commentPost._id,
        userId: props.authenticatedUserDetails._id,
      });
      console.log(socket);
      setComment("");
    }
  };

  //comment like interaction handle

  const cmtaddlike = async (cmtId) => {
    const responce = await cmtlike(cmtId);

    if (responce.status === 200) {
      const updatedResponce = await allcomment.map((comment) => {
        return comment._id === responce.data[0]._id
          ? responce.data[0]
          : comment;
      });
      fetchUserNames(updatedResponce);
    }
  };

  const cmtremovelike = async (cmtId) => {
    console.log("here is remove like");
    const responce = await cmtrmlike(cmtId);
    if (responce.status === 200) {
      const updatedResponce = allcomment.map((comment) => {
        return comment._id === responce.data[0]._id
          ? responce.data[0]
          : comment;
      });
      fetchUserNames(updatedResponce);
    }
  };

  const cmtaddDislike = async (cmtId) => {
    console.log("add dislike ");
    const responce = await cmtdislike(cmtId);
    if (responce.status === 200) {
      const updatedResponce = allcomment.map((comment) => {
        return comment._id === responce.data[0]._id
          ? responce.data[0]
          : comment;
      });
      fetchUserNames(updatedResponce);
    }
  };

  const cmtremovedislike = async (cmtId) => {
    console.log("remove dislike ");
    const responce = await cmtrmdislike(cmtId);
    if (responce.status === 200) {
      const updatedResponce = allcomment.map((comment) => {
        return comment._id === responce.data[0]._id
          ? responce.data[0]
          : comment;
      });
      fetchUserNames(updatedResponce);
    }
  };

  const cmthandleLike = async (cmtId) => {
    const comment = allcomment.find((comment) => comment._id === cmtId);

    if (!!comment) {
      if (comment.likes.includes(props.authenticatedUserDetails._id)) {
        await cmtremovelike(cmtId);
      } else {
        await cmtaddlike(cmtId);
        await cmtremovedislike(cmtId);
      }
    }
  };

  const cmthandledislike = async (cmtId) => {
    const comment = allcomment.find((comment) => comment._id === cmtId);

    if (!!comment) {
      if (comment.dislikes.includes(props.authenticatedUserDetails._id)) {
        await cmtremovedislike(cmtId);
      } else {
        await cmtaddDislike(cmtId);
        await cmtremovelike(cmtId);
      }
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
    socket.on("receive intial comment", (data) => {
      fetchUserNames(data);
    });
    socket.emit("join comment", props.commentPost._id);
    socket.on("receive comment", (data) => {
      fetchUserNames(data);
    });

    return () => {
      socket.off("receive intial comment");
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
                {commentPost.firstName} {commentPost.lastName}'s post
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
                  commentPost.AuthorImgSrc
                    ? `${commentPost.AuthorImgSrc}`
                    : "https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                }
                alt=""
              />
              <div className="flex flex-col pl-3 cursor-pointer">
                <p className="text-base font-medium">
                  {commentPost.firstName || commentPost.lastName
                    ? `${commentPost.firstName} ${commentPost.lastName} `
                    : "Unknown User"}
                </p>
                <p className="text-xs text-left text-gray-500 font-medium">
                  {`${timeCalculate(commentPost?.createdAt)}`}
                </p>
              </div>
            </div>
            <div className="text-gray-600 cursor-pointer">
              <i className="bi bi-three-dots hover:bg-gray-300 px-1 text-xl rounded-full p-1"></i>
            </div>
          </div>

          {/* Joblist Content Section */}
          {commentPost.ImgSrc ? (
            <img
              src={`${commentPost.ImgSrc}`}
              alt="random"
              className="shadow-inner border border-b-gray-200 w-full m-auto min-w-0 h-96 rounded-2xl object-cover object-center"
            />
          ) : null}

          {/* Job Overview Section */}
          {commentPost.ImgSrc ? (
            <div
              className="px-1 pb-2 pt-2 text-left cursor-pointer"
              onClick={() => toggleContent(commentPost._id)}
            >
              <p
                className={`text-base text-gray-900 ${
                  expandedPosts[commentPost._id]
                    ? "hidden"
                    : "block line-clamp-2"
                }`}
              >
                <b>Job Title:</b> {commentPost.jobTitle} <br />
                <b>Company Name:</b> {commentPost.companyName} <br />
                <b>Salary:</b> {commentPost.salary} <br />
                <b>Employment Type:</b> {commentPost.employmentType} <br />
                <b>Location:</b> {commentPost.location} <br />
              </p>
              <p className="text-base text-gray-900 block">
                <b>Job Title:</b> {commentPost.jobTitle} <br />
                <b>Company Name:</b> {commentPost.companyName} <br />
                <b>Salary:</b> {commentPost.salary} <br />
                <b>Employment Type:</b> {commentPost.employmentType} <br />
                <b>Location:</b> {commentPost.location} <br />
              </p>
            </div>
          ) : (
            <div className="px-1 pb-2 pt-2 text-left cursor-pointer">
              <p className="text-base text-gray-900 block">
                <b>Job Title:</b> {commentPost.jobTitle} <br />
                <b>Company Name:</b> {commentPost.companyName} <br />
                <b>Salary:</b> {commentPost.salary} <br />
                <b>Employment Type:</b> {commentPost.employmentType} <br />
                <b>Location:</b> {commentPost.location} <br />
              </p>
            </div>
          )}

          {/* Joblist Apply and React Section */}
          <div className="p-1 border-y border-gray-500 flex items-center justify-between">
            <div className="flex w-[40%] justify-between items-center text-lg">
              {/* Like Button */}
              <button
                onClick={() => handleLike(commentPost._id)}
                className={` rounded-md   justify-center px-2 py-1 shadow-sm shadow-slate-600 pl-3 flex items-center ${
                  commentPost.likes.includes(props.authenticatedUserDetails._id)
                    ? "text-gray-800"
                    : "text-gray-500"
                } focus:outline-none`}
              >
                <i className={`fas fa-thumbs-up  mr-1.5`}></i>
                <span
                  className={`text-sm ${
                    commentPost.likes.includes(
                      props.authenticatedUserDetails._id
                    )
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  {commentPost.likes.length == 0
                    ? "like"
                    : commentPost.likes.length == 1
                    ? " 1 like"
                    : ` ${commentPost.likes.length} likes`}
                </span>
              </button>

              {/* Dislike Button */}
              <button
                onClick={() => handledislike(commentPost._id)}
                className={`rounded-md m-auto  justify-center px-2 py-1 shadow-sm shadow-slate-600 w-[fit-content] flex items-center ${
                  commentPost.dislikes.includes(
                    props.authenticatedUserDetails._id
                  )
                    ? "text-gray-800"
                    : "text-gray-500"
                } focus:outline-none`}
              >
                <i className={`fas fa-thumbs-down mr-1.5`}></i>
                <span
                  className={`text-sm ${
                    commentPost.dislikes.includes(
                      props.authenticatedUserDetails._id
                    )
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  {commentPost.dislikes.includes(
                    props.authenticatedUserDetails._id
                  )
                    ? commentPost.dislikes.length == 0
                      ? "dislike"
                      : commentPost.dislikes.length == 1
                      ? " 1 dislike"
                      : ` ${commentPost.dislikes.length} dislikes`
                    : ""}
                </span>
              </button>
            </div>

            {/* Comment Button */}
            <button className="rounded-md justify-center px-2 py-1 shadow-sm shadow-slate-600 w-[fit-content] flex text-gray-800 mr-2 items-center focus:outline-none">
              <i className="bi  bi-chat-dots-fill text-xl comment-icon"></i>
              <span className={`text-sm pl-1 text-gray-800`}>
                {allcomment.length} comments
              </span>
            </button>

            <div className="w-1/4">
              <button
                onClick={() => props.jobapplyhandle(commentPost.AuthorId)}
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
                        onClick={() => cmthandleLike(newcomment._id)}
                        className={`cursor-pointer ${
                          newcomment.likes.includes(
                            props.authenticatedUserDetails._id
                          )
                            ? "bi bi-hand-thumbs-up-fill"
                            : "bi bi-hand-thumbs-up"
                        } text-sm pr-1`}
                      >
                        {newcomment.likes.length == 0
                          ? ""
                          : `${newcomment.likes.length}`}
                      </span>
                      <span
                        onClick={() => cmthandledislike(newcomment._id)}
                        className={`cursor-pointer ${
                          newcomment.dislikes.includes(
                            props.authenticatedUserDetails._id
                          )
                            ? "bi bi-hand-thumbs-down-fill"
                            : "bi bi-hand-thumbs-down"
                        } text-sm`}
                      >
                        {newcomment.dislikes.length == 0
                          ? ""
                          : `${newcomment.dislikes.length}`}
                      </span>
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
