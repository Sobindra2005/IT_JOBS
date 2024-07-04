import "../css/styles.css";
import React, { useState, useEffect } from "react";

import axios from 'axios'

function Message(props) {
function showmsgBox(data){
return props.showMessageBox(data)
}

  
  const token =localStorage.getItem("token");
  return (
    <>
      <div  className="Message z-9 bg-white fixed right-0 mt-16 border rounded-3xl  cursor-pointer h-screen  w-1/4 overflow-y-scroll">
        <h1 className=" p-3 pl-6 text-white fixed font-bold w-screen bg-notification rounded-tl-3xl text-2xl">Chats</h1>
        <div className=" bg-white mt-16 ">
        <input
          type="text"
          placeholder="search messages"
          className="outline-none border border-t-purple-200 text-base text-slate-700 w-11/12 ml-3 h-10 rounded-xl p-5 shadow-xl "
        >    </input>
        <ul className="pt-4 ">
          {props.MessageList.map((data) => (
            <li onClick={()=> showmsgBox(data) } key={data._id} className="flex shadow-md hover:bg-gray-200 transition duration-300 pb-2 pl-2  py-2 ">
              <div className="flex min-w-0 gap-x-2">
                <img
                  className="h-14 object-center object-cover w-14 flex-none border border-gray-200 rounded-full bg-gray-50"
                  src="https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-base font text-black pt-1 font-medium">
                 {data.firstName} {data.lastName}  
                  </p>
                  <p className="mt-0 truncate text-sm  text-gray-500">
                    Here appear the latest msg
                  </p>
                </div>
              </div>
            </li>
          ))} 
        </ul>
        </div>
      </div>
    </>
  );
}

export default Message;
