import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


const addProtocolIfMissing = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

export const Third = (props) => {
  const [addLink, setaddLink] = useState(false);
  const [text, setText] = useState("");
  const [websiteLink, setwebsiteLink] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [websiteValue, setwebsiteValue] = useState("");
  const [currentSocialLink, setcurrentSocialLink] = useState("");
  const [currentSocialplatform, setcurrentSocialplatform] = useState("");
 
console.log(text)
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

  const socialPlatfromSave = () => {
    if (currentSocialplatform == "github") {
      props.setlink({
        ...props.link,
        github: currentSocialLink,
      });
    }
    if (currentSocialplatform == "instagram") {
      props.setlink({
        ...props.link,
        instagram: currentSocialLink,
      });
    }
    if (currentSocialplatform == "twitter") {
      props.setlink({
        ...props.link,
        twitter: currentSocialLink,
      });
    }
    if (currentSocialplatform == "facebook") {
      props.setlink({
        ...props.link,
        facebook: currentSocialLink,
      });
    }

    if (currentSocialplatform == "linkedln") {
      props.setlink({
        ...props.link,
        linkedln: currentSocialLink,
      });
    }
    setcurrentSocialLink("");
    setcurrentSocialplatform("");
  };

  const hasSocialLinks = Object.entries(props.link)
    .filter(([key]) => key !== "protofolio")
    .some(([key, url]) => url !== "");

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
                      value={currentSocialplatform}
                      onChange={(e) => setcurrentSocialplatform(e.target.value)}
                      id="roles"
                      className="text-[16px] p-1 border border-gray-700 bg-gray-300 rounded-md mb-4 w-[fit-content] px-3 m-auto"
                    >
                      <option value="" disabled>
                        select media
                      </option>
                      <option value="github">Github</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter</option>
                      <option value="facebook">facebook</option>
                      <option value="whatsapp">Whatsapp</option>
                      <option value="linkedln">Linkedln</option>
                    </select>
                    <TextField
                      value={currentSocialLink}
                      onChange={(e) => setcurrentSocialLink(e.target.value)}
                      id="outlined-basic"
                      label="Add Links"
                      variant="outlined"
                    />
                    <button
                      onClick={() => socialPlatfromSave()}
                      type="text"
                      className="text-[16px] mt-1 border border-gray-700 bg-gray-300 rounded-md w-[fit-content] px-3 self-end"
                    >
                      save
                    </button>
                  </div>
                </>
              )}
              {/* Mapping through social links, excluding protofolio */}
              {hasSocialLinks &&
                Object.entries(props.link)
                  .filter(([key,url]) => key !== "protofolio" &&  url !== "")
                  .map(([platform, url]) => (
                    <div
                      key={platform}
                      className="mt-1 flex justify-between text-[16px] border border-gray-700 bg-gray-300 rounded-md w-full px-3"
                    >
                      <div>
                        <span className="bi bi-globe pr-4 border-r-2 border-gray-500"></span>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 pl-2 text-[underline]"
                          href={`${addProtocolIfMissing(url)}`}
                        >
                          {addProtocolIfMissing(url)}
                        </a>
                      </div>
                      <span
                        onClick={() => {
                          props.setlink({
                            ...props.link,
                            [platform]: "",
                          });
                        }}
                        className="bi bi-x text-lg text-black cursor-pointer"
                      >
                        {" "}
                      </span>
                    </div>
                  ))}

              <h1 className="text-black text-left mt-3 w-full  flex justify-between ">
                Websites{" "}
                {!props.link.protofolio && (
                  <span>
                    {" "}
                    {websiteLink === true && (
                      <button
                        onClick={() => setwebsiteLink(false)}
                        type="text"
                        className="text-[16px]  border border-gray-700 bg-gray-300 rounded-md  w-[fit-content] px-3 "
                      >
                        cancel
                      </button>
                    )}
                  </span>
                )}
              </h1>

              {props.link.protofolio && (
                <>
                  <div className=" mt-1 flex justify-between text-[16px]  border border-gray-700 bg-gray-300 rounded-md  w-full px-3">
                    <div>
                      {" "}
                      <span className="bi bi-globe pr-4 border-r-2  border-gray-500"></span>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 pl-2 text-[underline]"
                        href={`${addProtocolIfMissing(props.link.protofolio)}`}
                      >
                        {addProtocolIfMissing(props.link.protofolio)}
                      </a>
                    </div>

                    <span
                      onClick={(e) =>
                        props.setlink({
                          ...props.link,
                          protofolio: "",
                        })
                      }
                      className=" bi bi-x text-lg text-black cursor-pointer "
                    >
                      {" "}
                    </span>
                  </div>
                </>
              )}

              {!props.link.protofolio && (
                <div className="flex flex-col">
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
                    <>
                      {" "}
                      <TextField
                        value={websiteValue}
                        onChange={(e) => setwebsiteValue(e.target.value)}
                        id="outlined-basic"
                        label="Add protofolio website"
                        variant="outlined"
                      />
                      <button
                        onClick={async (e) => {
                          await props.setlink({
                            ...props.link,
                            protofolio: websiteValue,
                          });
                          await setwebsiteValue("");
                        }}
                        type="text"
                        className="text-[16px] mt-1 border border-gray-700 bg-gray-300 rounded-md w-[fit-content] px-3 self-end"
                      >
                        save
                      </button>
                    </>
                  )}
                </div>
              )}
              <h1 className="text-black text-left w-full  flex justify-between ">
                Bio
              </h1>
              <label htmlFor="bio"></label>
              <textarea
                value={text}
                placeholder="Add Bio"
                onChange={async(e)=>{
                 await  setText(e.target.value)
                 await  props.setFormData({
                  ...props.formData,
                  Bio:text
                })}}
                rows="3"
                spellCheck={false}
                className="bg-[#eff0ed] text-[18px] px-1  font-normal outline-none  border resize-none rounded-md border-gray-700 "
              />
              <div className="text-sm text-gray-600">
                {wordCount}/{18} words
              </div>
            </div>
          </div>
          <div
            onClick={() => props.setConfirm(true)}
            className="  w-full bg-blue-700 rounded text-white flex justify-center items-center h-[3rem] "
          >
            <Button variant="filled" className="w-full h-full">
              Submit{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
