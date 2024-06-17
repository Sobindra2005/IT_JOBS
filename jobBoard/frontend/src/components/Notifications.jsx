import '../css/styles.css'
import React, { useEffect, useState } from "react"
import socialMediaData from '../demodata/profiledata'

function Notifications() {
const[datas,finalData]=useState([])
useEffect(()=>{
    finalData(socialMediaData)
},[])
  return (
    <>
      <div className="Notification  z-9 fixed mt-16 left-0 overflow-scroll  cursor-pointer h-screen   w-1/4">
        <h2 className="text-xl text-white font-bold py-3 pl-1 fixed w-1/4  text-center  bg-notification ">Notifications</h2>
        <ul  className="pt-14 ">
            {datas.map(data => (
                  <li className="flex border-b pb-2 pl-2 hover:bg-gray-300 transition duration-300 border-line py-1 ">
                  <div className="flex min-w-0 gap-x-2">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={data.profilePic}
                      alt=""
                    />
                    <div className="min-w-0 pt-1 flex-auto">
                      <p className="text-base text-black">
                       {data.name}
                      </p>
                      <p className="mt-0 truncate text-sm text-gray-500">
                        {data.action}
                      </p>
                    </div>
                  </div>
                </li>
            ))
            }
        
        </ul>
      </div>
    </>
  );
}

export default Notifications;
