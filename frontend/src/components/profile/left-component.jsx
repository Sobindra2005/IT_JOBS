import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Left(props) {
    const navigate = useNavigate();
    const logout = async () => {
    await localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    props.setshowSuccess(true);
    props.setpopupmessage("Logout Successfully");
    props.setshowpopup(true);
    window.location.reload();
  };

  return (
    <>
      <div className=" w-1/4 p-5 h-3/4   ">
        <div className=" p-7  shadow-md  cursor-pointer flex flex-col shadow-gray-300 border-l-2 border-t-2 bg-white  border-sky-200 rounded-xl h-full ">
          <div className="text-base py-3 pt-6 border-t-2 border-gray-200 ">
            <i className="bi bi-person-fill hover:bg-gray-400  border mr-1 bg-gray-300  text-2xl text-black rounded-lg p-1 "></i>{" "}
            Profile
          </div>
          <div className="text-base  py-2  ">
            <i className="bi bi-pencil-square  mr-1 hover:bg-gray-400 bg-gray-300  text-2xl text-black rounded-lg p-1 "></i>{" "}
            Edit profile
          </div>
          <div className="text-base border-b-2 border-gray-200 py-2.5 pb-6  ">
            <i className="bi bi-gear  mr-1 hover:bg-gray-400 bg-gray-300  text-2xl text-black rounded-lg p-1  "></i>{" "}
            Settings
          </div>
          <div className="text-base  pt-7  ">
            <i
              onClick={logout}
              className="bi bi-box-arrow-right  mr-1 hover:bg-gray-400 bg-gray-300  text-2xl text-black rounded-lg p-1 "
            ></i>{" "}
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default Left;
