import React, { useState } from "react";

function Homecontent() {
  const [ExapandText, setExpandText] = useState(false);
  const toggleContent = () => {
    setExpandText(!ExapandText);
  };

  return (
    <>
      <section className="main-content w-2/4  mt-3 text-center  h-auto m-auto pt-16">
        {/* job post component */}
        <div className="new-job-post bg-white rounded-full  border border-t-gray-200 shadow-xl w-11/12 m-auto  flex flex-row">
          {/* top first componnet  */}
          <div className="p-2 px-8 justify-between  w-screen flex flex-row ">
            <div className="flex cursor-pointer">
              <img
                className="h-12 w-12 flex-none rounded-full object-cover object-center "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH6_3LEQ3Mt1Or0Zx53Yoyi-5qzZ55DdxVng&s"
                alt=""
              />
              <p className=" flex items-center font-medium pl-3 text-xl ">
             Talking Tom
              </p>
            </div>
            <div className="  mt-2  ">
              <button
                type="submit"
                className="ml-12 shadow-md rounded-md h-8 px-2   text-white items-center  bg-purple-900  hover:bg-purple-800  font-semibold "
              >
                Post Job
              </button>
            </div>
          </div>
        </div>

        {/* separated line  */}
        <div className="border border-b-1 w-11/12 m-auto mt-4 border-gray-400 "></div>

        {/* jobList section */}
        <div className=" bg-white mt-4 Job-list-section  flex-1 h-auto w-9/12 m-auto rounded-3xl flex flex-col p-4 border border-t-purple-200 shadow-xl ">
          {/* jobList top section */}
          <div className=" pb-3 flex flex-row justify-between ">
            <div className="flex flex-row cursor-pointer ">
              <img
                className="h-11  w-11 flex-none rounded-full object-cover object-center "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH6_3LEQ3Mt1Or0Zx53Yoyi-5qzZ55DdxVng&s"
                alt=""
              />
              <div className="flex flex-col pl-3 cursor-pointer ">
                <p className="text-base font-medium "> Talking Tom</p>
                <p className="text-xs text-left text-gray-500  font-medium ">
                  1d
                </p>
              </div>
            </div>
            <div className="text-gray-600 cursor-pointer  ">
              <i className="bi bi-three-dots hover:bg-gray-300 text-xl rounded-xl p-1"></i>{" "}
              <i className="bi bi-x text-2xl hover:bg-gray-300 p-0.5 rounded-xl "></i>
            </div>
          </div>
          {/* joblist content section */}
          <img src="https://picsum.photos/800/400" alt="random" className=" shadow-inner border border-b-gray-200 w-full m-auto min-w-0 h-72 rounded-2xl object-cover object-center ">

          </img>
          {/* Job overview section */}
          <div
            className="px-1 pt-2 text-left cursor-pointer "
            onClick={toggleContent}
          >
            <p className={` text-base text-gray-900  ${ExapandText? 'hidden' : 'block line-clamp-2'} `}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem rerum debitis distinctio sit quo reprehenderit, ad ullam architecto! Ut, quam! Architecto amet tenetur eligendi alias sunt a non, perferendis excepturi deleniti magni aliquam corrupti aspernatur optio facilis delectus laudantium saepe dolor voluptates debitis.
            </p>
            <p className={` text-base text-gray-900 ${ExapandText? 'block' : 'hidden' }`}> 
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem rerum debitis distinctio sit quo reprehenderit, ad ullam architecto! Ut, quam! Architecto amet tenetur eligendi alias sunt a non, perferendis excepturi deleniti magni aliquam corrupti aspernatur optio facilis delectus laudantium saepe dolor voluptates debitis.
            </p>
          </div>


          <div className="border border-b-1 w-full m-auto mt-4 border-gray-400 "></div>

          {/* joblist apply and react section */}
          <div className="flex flex-row justify-between px-6 pt-2 ">
            <div className=" space-x-2.5 text-2xl  ">
              <i className="fas fa-thumbs-up text-2xl  "></i>
              <span className="border-r-2 border-pink-500 text-sm pr-2 text-zinc-800 ">
                100k Likes
              </span>
              <i className="fas fa-thumbs-down  pl-2 text-2xl"></i>
            </div>
            <div>
              <button
                type="submit"
                className="border  py-1 px-3 rounded-md bg-notification hover:bg-pink-700 text-white "
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homecontent;
