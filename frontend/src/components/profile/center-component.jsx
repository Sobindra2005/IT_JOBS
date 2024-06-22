import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import projects from "../../demodata/project";
import { useEffect, useState } from "react";

function Center() {
  const [Projects, setprojects] = useState([]);

  useEffect(() => {
    setprojects(projects);
  }, []);

  return (
    <>
      {/* section for the center */}
      <div className="w-2/4  p-10 pt-16 h-screen  ">
        {/* profile overview section(first section) */}
        <div className=" p-4 shadow-md shadow-gray-300 border-l-2  bg-white border-t-2 border-sky-200 rounded-xl h-auto ">
          {/* top colored component along with profile head   */}
          <div className="rounded-xl flex justify-center items-end  w-full h-44 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 shadow-inner shadow-blue-400 border-b-2 border-gray-200  ">
            {/* profile head */}
            <div className="flex flex-row p-4 bg-gradient-to-b from-purple-300 to-white m-auto  h-28 absolute -mb-12 shadow-lg rounded-xl justify-between  w-custom-width ">
              {/* profile name and head  */}
              <div className=" h-full flex flex-row ">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH6_3LEQ3Mt1Or0Zx53Yoyi-5qzZ55DdxVng&s"
                  className=" object-center object-cover h-20 w-20 shadow-md shadow-gray-700  rounded-xl "
                  alt=""
                ></img>
                {/* name and title */}
                <div className="ml-4 flex flex-col justify-center ">
                  <h1 className="text-xl font-semibold text-gray-700   ">
                    Talking Tom
                  </h1>
                  <p className=" text-base text-gray-500 font-medium ">
                    Nasa Hecker{" "}
                  </p>
                </div>
              </div>
              {/* social media links */}
              <div className=" w-auto h-auto gap-x-3 cursor-pointer text-white flex flex-row items-center ">
                <FaGithub
                  size={38}
                  className=" bg-black rounded-md p-2 hover:bg-slate-800"
                />
                <FaLinkedin
                  size={38}
                  className=" bg-blue-500 rounded-md p-2 hover:bg-blue-400"
                />
                <FaFacebook
                  size={38}
                  className=" bg-blue-700 rounded-md p-2 hover:bg-blue-600"
                />
              </div>
            </div>
          </div>
          <div className="mt-20 ">
            <h1 className="text-xl font-semibold text-cyan-700 leading-10 ">
              About me{" "}
            </h1>
            <p className="text-base text-gray-500 font-medium">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
              perspiciatis nemo Lorem, ipsum dolor sit
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              quasi? Lorem ipsum dolor sit
            </p>
          </div>
        </div>

        {/* project section */}
        <div className="p-6 shadow-md shadow-gray-300 border-l-2 mt-6 bg-white border-t-2 border-sky-200 rounded-xl h-auto ">
          <h1 className="text-base  text-gray-700 font-semibold ">
            Projects Table
          </h1>
          <div>
            <table className="w-full mt-5">
              <thead>
                <tr className="text-left ">
                  <th className="text-base font-medium text-gray-500 ">
                    Project
                  </th>
                  <th className="text-base font-medium text-gray-500 ">
                    status
                  </th>
                  <th className="text-base font-medium text-gray-500 ">
                    Github
                  </th>
                  <th className="text-base font-medium text-gray-500 ">link</th>
                </tr>
              </thead>

              <tbody>
                {Projects.map((project, index) => (
                       <tr className="border-t-2 border-gray-300">
                       <td className=" p-2 "> {project.name} </td>
                       <td className={`p-2 ${ project.status==="In Progress"?'text-green-700': project.status==='Pending'?'text-red-900':'text-yellow-400' }`} >{project.status} </td>
                       <td className="text-blue-600  p-2 pr-2  underline ">
                         <a href=" ">github</a>{" "}
                       </td>
                       <td className="text-blue-600  p-2  underline ">
                         <a href="">project Link</a>
                       </td>
                     </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Center;
