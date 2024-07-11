import "../css/styles.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { postMessage, getorcreateMsg } from "../api/messageHanlde";

function Messagebox(props) {
  const [message, setMessage] = useState("");
  const [allmessage, setallmessage] = useState('');

  const sendMessage = async () => {
    const responseSendMsg = await postMessage(
      props.authenticatedUserDetails._id,
      props.selectUserMsg._id,
      props.chatId,
      `${message}`
    );
    props.updateMsg(responseSendMsg.data.allMessage);
    setMessage("");
    props.sendMessage(props.chatId);
  };

  async function getMsg() {
    const response = await getorcreateMsg(
      props.authenticatedUserDetails._id,
      props.selectUserMsg._id
    );
  return response
  }

  useEffect(() => {
    getMsg
   

  }, [props.allmsg.length]);

  return (
    <>
      <div className="Message z-10 bg-white fixed right-80 bottom-6 mt-16 border rounded-3xl cursor-pointer h-2/3 w-1/4 shadow-lg shadow-blue-500/50">
        {/* top component */}
        <div className="pl-2 pt-2 pb-2 w-full shadow-lg flex flex-row pr-2">
          {/* left, right component controller */}
          <div className="flex flex-row pl-2 pt-1 w-full justify-between">
            {/* Top left component */}
            <div className="flex flex-row">
              <img
                className="h-10 border border-gray-200 w-10 object-center object-cover flex-none rounded-full bg-gray-50"
                src="https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                alt=""
              />
              <div className="pl-2 pt-1">
                <p className="text-base text-black leading-tight">
                  {props.selectUserMsg.firstName} {props.selectUserMsg.lastName}
                </p>
                <p className="text-sm text-gray-600 leading-tight">
                  active 1hr ago
                </p>
              </div>
            </div>
            {/* Top right component */}
            <i
              onClick={props.removeMessageBox}
              className="bi bi-x text-3xl hover:bg-gray-300 rounded-full h-auto px-1.5 flex items-center text-gray-700"
            ></i>
          </div>
        </div>

        {/* text message component */}
        <div className="overflow-y-auto w-full text-gray-900 h-72 p-2 flex flex-col space-y-1">
          {props.allmsg.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                props.authenticatedUserDetails._id == msg.senderId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <p className="px-2 normal-case py-1 w-auto max-w-[50%] rounded-r-xl rounded-t-xl bg-cyan-400">
                {msg.message}
              </p>
            </div>
          ))}
        </div>

        {/* bottom component */}
        <div className="absolute bottom-0 w-full pt-3 mb-0 flex pb-2 flex-row justify-center h-3/12 rounded-3xl">
          <textarea
            value={message}
            spellCheck="false"
            onChange={(e) => setMessage(e.target.value)}
            className="normal-case rounded-md p-2 resize-none outline-none h-auto w-10/12 text-base px-2 text-slate-800 bg-slate-200"
            type="text"
            placeholder="write messages.."
          ></textarea>

          <i
            onClick={sendMessage}
            className="bi bi-caret-right-fill flex items-center text-2xl ml-2 text-violet-900"
          ></i>
        </div>
      </div>
    </>
  );
}

export default Messagebox;
