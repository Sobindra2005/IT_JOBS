

function Jobapply(props) {
  return (
    <>
      <div className="w-screen  overflow-scroll fixed inset-0 bg-gray-800 bg-opacity-60 z-50 flex justify-center  ">
        <div className="bg-white border relative h-auto px-3 border-black  p-2  rounded-xl w-2/5 overflow-scroll  my-2 shadow-md  flex flex-col  ">
         <div className="flex ">
          <h1 className=" text-center flex  justify-center mx-auto w-2/4 text-xl border-b-2 border-gradient-to-r from-transparent via-black to-transparent  font-semibold text-gray-600 ">
            Apply Job
          </h1><span onClick={props.removejobapplyhandle} className="bi bi-x text-2xl rounded-full flex-items-center hover:bg-gray-200 px-1 "></span>
          </div>

          <div className="p-2 flex mt-2 w-full justify-between ">
            <div className=" flex items-center w-2/4  h-8  border border-gray-400  px-1 text-gray-700">
              <label className="text-gray-700 " htmlFor="firstName"></label>
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                className=" h-7 w-full outline-none rounded-l-lg px-1 text-gray-600"
              />
              <span className="bi bi-person-fill pl-1 border-l-2 border-gray-300 text-xl "></span>
            </div>
            <div className=" flex items-center  w-2/4  h-8 border border-gray-400  px-1 text-gray-700">
              <label className="text-gray-700 " htmlFor="lastName"></label>
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                className=" h-7  outline-none w-full rounded-l-lg px-1text-xl text-gray-600"
              />
              <span className="bi bi-person-fill pl-1 border-l-2  border-gray-300 text-xl "></span>
            </div>
          </div>
          <div className="p-2 flex w-full  justify-between ">
            <div className=" flex items-center w-2/4  h-8  border border-gray-400  px-1 text-gray-700">
              <label className="text-gray-700 " htmlFor="email"></label>
              <input
                type="text"
                id="email"
                placeholder="email"
                className=" h-7  outline-none w-full rounded-l-lg px-1 text-gray-600"
              />
              <span className="bi bi-envelope-fill pl-1 border-l-2 border-gray-300 text-xl "></span>
            </div>
            <div className=" flex items-center w-2/4   h-8 border border-gray-400  px-1 text-gray-700">
              <label className="text-gray-700 " htmlFor="phone"></label>
              <input
                type="text"
                id="phone"
                placeholder="phone"
                className=" h-7 w-full  outline-none rounded-l-lg px-1text-xl text-gray-600"
              />
              <span className="bi bi-phone-fill pl-1 border-l-2  border-gray-300 text-xl "></span>
            </div>
          </div>
          <div className=" flex mx-2  h-8  border border-gray-400  px-1 text-gray-700">
            <label className="text-gray-700 " htmlFor="country"></label>
            <input
              type="text"
              id="country"
              placeholder="select country"
              className=" h-7 w-full  outline-none rounded-l-lg px-1 text-gray-600"
            />
          </div>
          <div className="p-2 flex mt-2  justify-between ">
            <div className=" flex items-center w-8/12  h-8  border border-gray-400  px-1 text-gray-700">
              <label className="text-gray-700 " htmlFor="city"></label>
              <input
                type="text"
                id="city"
                placeholder="city"
                className=" w-full h-7  outline-none rounded-l-lg px-1 text-gray-600"
              />
              <span className="bi bi-building-fill pl-1 border-l-2 border-gray-300 text-xl "></span>
            </div>
            <div className=" flex items-center w-1/4  h-8 border border-gray-400  px-1 text-gray-700">
              <label className="text-gray-700 " htmlFor="postalcode"></label>
              <input
                type="text"
                id="postalcode"
                placeholder="postal code"
                className=" h-7 w-full outline-none rounded-l-lg px-1text-xl text-gray-600"
              />
              <span className="bi bi-mailbox2 pl-1 border-l-2  border-gray-300 text-xl "></span>
            </div>
          </div>
          <div className=" flex mx-2  h-8  border border-gray-400  px-1 text-gray-700">
            <label className="text-gray-700 " htmlFor="address"></label>
            <input
              type="address"
              id="address"
              placeholder="Address"
              className=" h-7 w-full  outline-none rounded-l-lg px-1 text-gray-600"
            />
            <span className="bi bi-house-fill pl-1 border-l-2  border-gray-300 text-xl "></span>
          </div>
          <textarea
            className="border border-gray-400 text-gray-700 text-md  h-44 p-2 mx-2 mt-2 resize-none outline-none "
            placeholder="Why do You Want this job ??"
          />
          <div className="p-2 flex w-full mt-2 justify-between ">
            <div className="w-2/4 ">
            <div className=" flex items-center    h-8  border border-gray-400  px-1 text-gray-700">
              <label className="text-gray-700 " htmlFor="cv"></label>
              <input
                type="file"
                id="cv"
                className=" h-7  outline-none w-full rounded-l-lg  text-gray-600"
              />
            </div>
            <p className="text-gray-500 ">Upload cover letter</p>
            </div>
            <div className="w-2/4  ">
            <div className=" flex items-center    h-8 border border-gray-400   text-gray-700">
              <label className="text-gray-700 " htmlFor="lastName"></label>
              <input
                type="file"
                id="lastName"
                placeholder="Last name"
                className=" h-7 w-full  outline-none rounded-l-lg px-1text-xl text-gray-600"
              />
            </div>
            <p className="text-gray-500 "> Upload cv </p>
            </div>
          </div>

          <div className="mt-6 border-t-2 border-dashed flex justify-end border-gray-700 mx-2">
            <button type="submit" className="bg-indigo-900 px-3 text-lg text-white mt-7 ">
                submit
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Jobapply;
