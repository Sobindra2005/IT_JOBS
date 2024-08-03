import "../css/styles.css";
import React, { useEffect, useState } from "react";
import { getnotifications } from "../api/Notifications";
import { timeCalculate } from "./functions/function";
import { socket } from "../socket";

function Notifications() {
  const [datas, setData] = useState([]);

  const getNotifications = async () => {
    const responce = await getnotifications();
    console.log(responce);
    setData(responce.data);
  };
  useEffect(() => {
    socket.on('notifications', (data) => {
      console.log("notification event is listened here ");
      console.log(data);
      setData(data);
    });
    getNotifications();

    return () => {
      socket.off('notifications');
    };
  }, []);
  return (
    <>
      <div
        className={`Notification  z-9 fixed mt-16 left-0 overflow-scroll  cursor-pointer h-screen  bg-white  w-1/4`}
      >
        <h2 className="text-xl text-white font-bold py-3 pl-1 fixed w-1/4  text-center  bg-notification ">
          Notifications
        </h2>
        <ul className="pt-14  bg-white ">
          {datas.length > 0 ? (
            <>
              {datas.map((data, index) => (
                <li
                  key={index}
                  className={`flex border-b pb-2 pl-2 hover:bg-gray-300 transition duration-300 border-line py-1 ${
                    data.isRead === false ? "bg-blue-300 " : ""
                  }`}
                >
                  <div className="flex min-w-0 gap-x-2">
                    <img
                      className="h-12 w-12 object-center object-cover flex-none rounded-full bg-gray-50"
                      src="https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                      alt=""
                    />
                    <div className="min-w-0 pt-1 flex-auto">
                      <p
                        className={`text-[17px] overflow-y-hidden  h-auto max-h-[3] leading-none text-black `}
                      >
                        <span className="font-[500]">
                          {data.userId.firstName} {data.userId.lastName}{" "}
                        </span>
                        <span className="font-normal normal-case text-[15px] text-gray-900">
                          {data.message}
                        </span>
                      </p>

                      <span className=" normal-case font-normal text-[13px] text-gray-600 ml-1">
                        {`${timeCalculate(data.updatedAt)}`}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </>
          ) : (
            <div className="text-gray-600 mt-[50%] pl-4 ">
              No new notifications. Keep an eye out for updates!
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

export default Notifications;
