function Right(props) {
  return (
    <>
      <div className="w-1/4 p-5 h-3/4   ">
        <div className=" p-7  shadow-md  cursor-pointer flex flex-col shadow-gray-300 border-l-2 border-t-2 bg-white  border-sky-200 rounded-xl h-full ">
          <h1 className="text-gray-500 text-base font-medium ">More details</h1>
          <div className="text-base py-1 border-t-2 border-gray-300 pt-4  flex flex-row ">
            <i className="bi bi-envelope  mr-4 text-2xl text-gray-700  "></i>
            <div>
              <h2 className="leading-tight text-base text-gray-900 ">Email</h2>
              <p className="text-sm leading-tight text-blue-900 lowercase ">{props.authenticatedUserDetails.email}</p>
            </div>
          </div>

          <div className="text-base py-1 flex flex-row   ">
            <i className="bi bi-translate  mr-4 text-2xl text-gray-700  "></i>{" "}
            <div>
              <h2 className="leading-tight text-base text-gray-900 ">language</h2>
              <p className="text-sm leading-tight text-blue-900 ">Nepali,English</p>
            </div>
          </div>
          <div className="text-base py-1 flex flex-row  ">
            <i className="bi bi-book  mr-4 text-2xl text-gray-700  "></i>{" "}
            <div>
              <h2 className="leading-tight text-base text-gray-900 ">Education</h2>
              <p className="text-sm leading-tight text-blue-900 ">Csit 1st sem</p>
            </div>
          </div>
          <div className="text-base border-b-2 border-gray-300 pb-5 py-1 flex flex-row  ">
            <i className="bi bi-puzzle  mr-4 text-2xl text-gray-700  "></i>{" "}
            <div>
              <h2 className="leading-tight text-base text-gray-900 ">Skills</h2>
              <p className="text-sm leading-tight text-blue-900 ">Python,c,c++,java </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Right;
