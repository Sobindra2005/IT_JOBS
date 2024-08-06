import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const Second = (props) => {
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* screeen div */}
      <div className="w-screen h-screen flex justify-center flex-col bg-white items-center">
        {/* component div */}

        <div className="w-[23rem]  border justify-around border-black  text-gray-800 items-center rounded h-[25rem] shadow bg-[#eff0ed] flex flex-col">
          {/* title of the div */}
          <h1 className="text-center pt-2  text-xl   w-[20rem] text-gray-700 ">
            Upload Your Profile Picture ?
          </h1>

          {/* main scrolling div */}
          <div className="w-full ">
            <div className="flex flex-col justify-center  ">
              <div className="relative mt-2 w-[9rem] m-auto   h-[9rem] flex flex-col  rounded-full overflow-hidden cursor-pointer bg-[#b0c4b1] border border-gray-300">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                    <img
                      src="https://cdn.vectorstock.com/i/500p/16/05/male-avatar-profile-picture-silhouette-light-vector-5351605.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="mt-5 m-auto flex justify-center items-center ">
                {" "}
                <Button
                  onClick={handleDivClick}
                  variant="contained"
                  size="large"
                  className="w-[fit-content]  text-white "
                >
                  upload
                </Button>
              </div>
            </div>

            <div className="flex justify-around  m-auto mt-12 text-xl  my-3 w-[100%]  ">
              <button
                onClick={() => props.setView("third")}
                type="button "
                className=" px-3 py-1 border border-black rounded  cursor-pointer text-black "
              >
                {" "}
                Skip
              </button>
              <div
                onClick={() => props.setView("third")}
                className=" bg-blue-700 flex items-center justify-center text-white rounded cursor-pointer"
              >
                <Button variant="filled "> Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
