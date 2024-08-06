import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


export const Third = (props) => {
  const [addLink, setaddLink] = useState(false);
  const [link, setlink] = useState({
    github: "",
    instagram: "",
    twitter: "",
    snapchat: "",
    whatsapp: "",
    linkedln: "",
  });
  const [websiteLink, setwebsiteLink] = useState(false);
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const countWords = (str) => {
    const words = str
      .trim()
      .split(/[\s,.;]+/)
      .filter((word) => word.length > 0);
    return words.length;
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    const words = countWords(inputText);

    if (words <= 18) {
      setText(inputText);
      setWordCount(words);
    } else {
    }
  };
  return (
    <>
      {/* screeen div */}
      <div className="w-screen h-screen flex justify-center flex-col bg-white items-center">
        {/* component div */}

        <div className="w-[30rem]  border p-4 border-black  text-gray-800 items-center rounded h-[35rem] shadow bg-[#eff0ed] flex flex-col">
          {/* title of the div */}
          <h1 className="text-center pt-2  text-lg border-b border-gray-700   w-[27rem] text-gray-700 ">
            Links And Other preferences
          </h1>

          {/* main scrolling div */}
          <div className="h-[29rem] mt-3 w-full  overflow-auto   ">
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
                      className="text-[16px] mt-1 border border-gray-700 bg-gray-300 rounded-md w-[fit-content] px-3 self-end"
                    >
                      save
                    </button>
                  </div>
                </>
              )}
              <h1 className="text-black text-left mt-3 w-full  flex justify-between ">
                Websites  {websiteLink === true && (
                    <button
                      onClick={() => setwebsiteLink(false)}
                      type="text"
                      className="text-[16px]  border border-gray-700 bg-gray-300 rounded-md  w-[fit-content] px-3 "
                    >
                      cancel
                    </button>
                  )}
              </h1>
              {websiteLink === false && (
                <button
                  onClick={() => setwebsiteLink(true)}
                  type="text"
                  className="text-[16px] mt-1 border self-center border-gray-700 bg-gray-300 rounded-md w-[fit-content] px-3 "
                >
                  Add protofolio website{" "}
                 
                </button>
              )}

              {websiteLink === true && (
                <TextField
                  id="outlined-basic"
                  label="Add protofolio website"
                  variant="outlined"
                
                />
              )}
              <h1 className="text-black text-left w-full  flex justify-between ">
                Bio
              </h1>
              <label htmlFor="bio"></label>
              <textarea
                value={text}
                placeholder="Add Bio"
                onChange={handleChange}
                rows="3"
                spellCheck={false}
                className="bg-[#eff0ed] text-[18px] px-1  font-normal outline-none  border resize-none rounded-md border-gray-700 "
              />
              <div className="text-sm text-gray-600">
                {wordCount}/{18} words
              </div>
            </div>
          </div>
          <div onClick={()=>props.setConfirm(true)} className="  w-full bg-blue-700 rounded text-white flex justify-center items-center h-[3rem] ">
            <Button variant="filled" className="w-full h-full">
              Submit{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
