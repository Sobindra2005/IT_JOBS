import "../css/styles.css";
import React, { useState, useEffect } from "react";
import message from "../demodata/chats";

function Message() {


  const [datas, finalData] = useState([]);
    useEffect(() => {
    finalData(message);
  }, []);

  return (
    <>
      <div className="Message z-9 bg-white fixed right-0 mt-16 border rounded-3xl  cursor-pointer h-screen  w-1/4 overflow-y-scroll">
        <h1 className=" p-3 pl-6 text-white fixed font-bold w-screen bg-notification rounded-tl-3xl text-2xl">Chats</h1>
        <div className=" bg-white mt-16 ">
        <input
          type="text"
          placeholder="search messages"
          className="outline-none border border-t-purple-200 text-base text-slate-700 w-11/12 ml-3 h-10 rounded-xl p-5 shadow-xl "
        >    </input>
        <ul className="pt-4 ">
          {datas.map((data) => (
            <li className="flex shadow-md hover:bg-gray-200 transition duration-300 pb-2 pl-2  py-2 ">
              <div className="flex min-w-0 gap-x-2">
                <img
                  className="h-14 object-center object-cover w-14 flex-none rounded-full bg-gray-50"
                  src={data.profilePic}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-base text-black pt-1 font-medium">
                    {data.name}
                  </p>
                  <p className="mt-0 truncate text-sm  text-gray-500">
                    {data.action}
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
