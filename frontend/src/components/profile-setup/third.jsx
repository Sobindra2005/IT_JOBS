import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const Third = (props) => {
  const [addLink, setaddLink] = useState(false);
  const [link,setlink]=useState()
  return (
    <>
      {/* screeen div */}
      <div className="w-screen h-screen flex justify-center flex-col bg-white items-center">
        {/* component div */}

        <div className="w-[30rem]  border p-4 border-black  text-gray-800 items-center rounded h-[35rem] shadow bg-[#eff0ed] flex flex-col">
          {/* title of the div */}
          <h1 className="text-center pt-2  text-lg border-b border-gray-700   w-[25rem] text-gray-700 ">
            Social media Links And Other preferences
          </h1>

          {/* main scrolling div */}
          <div className="h-[29rem] mt-3 w-full border overflow-auto  border-black  ">
            <div className="flex flex-col justify-around  m-auto  text-xl   w-[100%]  ">
              <h1 className="text-black text-left w-full  flex justify-between ">
                Social Links{" "}
                {addLink === true && (
                  <button
                    onClick={() => setaddLink(false)}
                    type="text"
                    className="text-[16px]  border border-gray-700 bg-gray-300 rounded-md  w-[fit-content] px-3 "
                  >
                    cancel
                  </button>
                )}
              </h1>
              {addLink === false && (
                <button
                  onClick={() => setaddLink(true)}
                  type="button"
                  className="text-[16px] flex justify-between border border-gray-700 bg-gray-300 rounded-md  w-[fit-content] px-3 m-auto"
                >
                  Add Links
                </button>
              )}
              {addLink === true && (
                <>
                  <div className="w-full flex flex-col">
                    <select
                      id="roles"
                      className="text-[16px] p-1 border border-gray-700 bg-gray-300 rounded-md mb-4 w-[fit-content] px-3 m-auto"
                    >
                      <option value="github">Github</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter</option>
                      <option value="snapchat">Snapchat</option>
                      <option value="whatsapp">Whatsapp</option>
                      <option value="linkedln">Linkedln</option>
                    </select>
                    <TextField
                      id="outlined-basic"
                      label="Add Links"
                      variant="outlined"
                    />
                    <button
                      type="text"
                      className="text-[16px] border border-gray-700 bg-gray-300 rounded-md w-[fit-content] px-3 self-end"
                    >
                      save
                    </button>
                  </div>
                </>
              )}
              {

              }
            </div>
          </div>
          <div className="border pt-1 w-full flex justify-center items-center h-[3rem] border-black ">
            <Button variant="outlined" className="w-full ">
              Submit{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
