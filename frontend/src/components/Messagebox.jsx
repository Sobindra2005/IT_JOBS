import "../css/styles.css";
import React, { useState, useEffect } from "react";
import message from "../demodata/chats";

function Messagebox() {
  return (
    <>
      <div className="Message z-9 bg-white fixed right-6 bottom-6 mt-16 border rounded-3xl  cursor-pointer h-2/3  w-1/4  shadow-lg shadow-blue-500/50 ">
        {/* top component */}
        <div className="pl-2 pt-2 pb-2 w-full shadow-lg flex  flex-row pr-2 ">
          {/* left ,right component controller */}
          <div className="flex flex-row pl-2 pt-1 w-full justify-between ">
            {/* Top left component */}
            <div className="flex flex-row ">
              <img
                className="h-10 w-10 object-center object-cover flex-none rounded-full bg-gray-50"
                src="https://randomuser.me/api/portraits/men/7.jpg"
                alt=""
              />
              <div className="pl-2 pt-1">
                <p className=" text-base text-black leading-tight  ">
                  Rahul Tamang
                </p>
                <p className="text-sm text-gray-600 leading-tight">
                  active 1hr ago
                </p>
              </div>
            </div>
            {/* Top right component */}
            <i class="bi bi-x text-3xl text-gray-700"></i>
          </div>
        </div>

        {/* text message component
        <div className="  overflow-y-scroll ">

        </div> */}

        {/* bottom component */}
        <div className=" absolute bottom-0 w-full pt-3 mb-0 flex pb-2 flex-row justify-center  h-auto px-2  rounded-3xl bg-sky-300 ">
         
            <input className=" rounded-full outline-none  h-auto  w-10/12 text-base px-2 text-slate-800 bg-slate-100 " type="text" placeholder="write messages.."></input>

            <i class="bi bi-caret-right-fill  h-8 text-2xl  ml-1 text-violet-900 "></i>

        </div>
      </div>
    </>
  );
}

export default Messagebox;
