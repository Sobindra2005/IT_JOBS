import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function Jobposting(props) {
  const [showDropzone, setShowDropzone] = useState(false);
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const filteredFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const newFiles = filteredFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  
  const removefiles = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: " image/* ",
  });

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      className="flex w-3/4 relative justify-center p-1 border border-gray-300 rounded-md"
    >
      <button
        onClick={() => removefiles(file.name)}
        className="absolute top-0 right-0 bg-gray-300 text-black text-2xl hover:bg-gray-400 rounded-full w-5 h-5 flex items-center justify-center"
      >
        &times;
      </button>
      <img
        src={file.preview}
        alt={file.name}
        className=" w-full h-40 object-cover rounded-md"
      />
    </div>
  ));

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      {/* job posting main section */}
      <div className="jobposting-section w-screen h-auto overflow-scroll fixed inset-0 bg-gray-800 bg-opacity-60 z-50 flex justify-center items-center ">
        <div className="bg-white w-5/12 h-auto p-2 rounded-2xl shadow shadow-gray-600">
          <div className="flex border-b-2 border-gray-300">
            <h1 className="text-2xl text-black flex justify-center h-7 w-full">
              Create Job
            </h1>
            <div
              onClick={props.removeJobposthandle}
              className="bi bi-x text-2xl hover:bg-gray-400 rounded-lg items-center relative flex justify-end"
            ></div>
          </div>
          <div className="flex pl-4 mt-2 flex-row cursor-pointer">
            <img
              className="h-11 w-11 flex-none rounded-full object-cover object-center"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH6_3LEQ3Mt1Or0Zx53Yoyi-5qzZ55DdxVng&s"
              alt=""
            />
            <div className="flex flex-col pl-3 cursor-pointer">
              <p className="text-base font-medium">Talking Tom</p>
              <p className="text-xs text-left text-gray-500 font-medium">
                <select className="form-select text-sm bg-white" required>
                  <option value="public">🌐 public</option>
                  <option value="private">🔒 private</option>
                </select>
              </p>
            </div>
          </div>
          <textarea
            className="resize-none w-full p-3 text-lg block text-gray-700 h-32 py-3 outline-none rounded-xl border border-gray-300 mt-2"
            placeholder="Write Something about job ???"
          />
          {showDropzone && (
            <>
              <div
                {...getRootProps({
                  className:
                    "dropzone mt-2  w-full border-dotted border-gray-300 rounded-lg flex justify-center items-center flex-col",
                })}
              >
                <input {...getInputProps()} />
                <div className="h-16 w-32 border-2 border-dashed border-gray-400 flex items-center justify-center ">
                  <span className="bi bi-plus text-xl border-dashed border rounded-full border-gray-400 hover:bg-slate-200 px-1 text-gray-400 "></span>
                </div>
              </div>

              <div className="flex justify-center w-full  mt-2">
                {files && thumbs}
              </div>
            </>
          )}
          <div className="text-gray-700 mt-2 px-2 flex justify-between">
            <i
              className="bi bi-images text-3xl cursor-pointer"
              onClick={() => setShowDropzone(!showDropzone)}
            ></i>
            <button
              type="submit"
              className="bg-notification hover:bg-blue-950 px-4 flex items-center text-lg text-white rounded-lg"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobposting;
