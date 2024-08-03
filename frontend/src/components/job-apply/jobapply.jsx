import { NotifyJobapply } from "../../api/Notifications";
import { Jobapplyapi } from "../../api/jobapply";
import react, { useState } from "react";
import {socket} from '../../socket'

function Jobapply(props) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [address, setaddress] = useState("");
  const [descriptionforjob, setdescriptionforjob] = useState("");
  
  const jobapply = async (e) => {
    try {
      console.log(props.jobAuthorId)
      e.preventDefault();
      const responce = await Jobapplyapi(
        props.authenticatedUserDetails,
        props.jobAuthorId,
        props.jobapplypostId,
        firstName,
        lastName,
        email,
        phonenumber,
        country,
        city,
        postalcode,
        address,
        descriptionforjob
      );

      if (responce.status === 200) {
        props.setshowSuccess(true);
        props.setpopupmessage("Job apply  Successfully");
        props.setshowpopup(true);
        props.removejobapplyhandle();
      }

      const notifyresponce = await NotifyJobapply(
        props.jobAuthorId,
        props.authenticatedUserDetails,
        responce.data.postId.jobTitle
      );

      if(notifyresponce.status === 200){
   
        socket.emit('identify notification',props.jobAuthorId)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          props.setshowError(true);
          props.setpopupmessage("Invalid Email/Password");
          props.setshowpopup(true);
        } else {
          props.setshowError(true);
          props.setpopupmessage("An error occurred. Please try again later.");
          props.setshowpopup(true);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        props.setshowError(true);
        props.setpopupmessage(
          "No response from server. Please try again later."
        );
        props.setshowpopup(true);
      } else {
        console.error("Error message:", error.message);
        props.setshowError(true);
        props.setpopupmessage("An error occurred. Please try again later.");
        props.setshowpopup(true);
      }
    }
  };


  return (
    <>
      <div className="w-screen h-screen overflow-scroll fixed inset-0 bg-gray-800 bg-opacity-60 z-50 flex justify-center  ">
        <div className="bg-white  border relative h-auto px-3 border-black  p-2  rounded-xl w-2/5 overflow-scroll  my-2 shadow-md  flex flex-col  ">
          <div className="flex ">
            <h1 className=" text-center flex  justify-center mx-auto w-2/4 text-xl border-b-2 border-gradient-to-r from-transparent via-black to-transparent  font-semibold text-gray-600 ">
              Apply Job
            </h1>
            <span
              onClick={props.removejobapplyhandle}
              className="bi bi-x text-2xl rounded-full flex-items-center hover:bg-gray-200 px-1 "
            ></span>
          </div>
          <form onSubmit={jobapply}>
            <div className="p-2 flex mt-2 w-full justify-between ">
              <div className=" flex items-center w-2/4  h-8  border border-gray-400  px-1 text-gray-700">
                <label className=" text-gray-700 " htmlFor="firstName"></label>
                <input
                  spellCheck="false"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  type="text"
                  id="firstName"
                  placeholder="First name*"
                  className=" h-7 w-full outline-none rounded-l-lg px-1 text-gray-600"
                  required
                />
                <span className="bi bi-person-fill pl-1 border-l-2 border-gray-300 text-xl "></span>
              </div>
              <div className=" flex items-center  w-2/4  h-8 border border-gray-400  px-1 text-gray-700">
                <label className="text-gray-700 " htmlFor="lastName"></label>
                <input
                  spellCheck="false"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  type="text"
                  id="lastName"
                  placeholder="Last name*"
                  className=" h-7  outline-none w-full rounded-l-lg px-1text-xl text-gray-600"
                  required
                />
                <span className="bi bi-person-fill pl-1 border-l-2  border-gray-300 text-xl "></span>
              </div>
            </div>
            <div className="p-2 flex w-full  justify-between ">
              <div className=" flex items-center w-2/4  h-8  border border-gray-400  px-1 text-gray-700">
                <label className="text-gray-700 " htmlFor="email"></label>
                <input
                  spellCheck="false"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="text"
                  id="email"
                  placeholder=" Email*"
                  className=" normal-case  h-7  outline-none w-full rounded-l-lg px-1 text-gray-600"
                  required
                />
                <span className="bi bi-envelope-fill pl-1 border-l-2 border-gray-300 text-xl "></span>
              </div>
              <div className=" flex items-center w-2/4   h-8 border border-gray-400  px-1 text-gray-700">
                <label className="text-gray-700 " htmlFor="phone"></label>
                <input
                  spellCheck="false"
                  value={phonenumber}
                  onChange={(e) => setphonenumber(e.target.value)}
                  type="tel"
                  id="phone"
                  placeholder="phone*"
                  className=" h-7 w-full  outline-none rounded-l-lg px-1text-xl text-gray-600"
                  required
                />
                <span className="bi bi-phone-fill pl-1 border-l-2  border-gray-300 text-xl "></span>
              </div>
            </div>
            <div className=" flex mx-2  h-8  border border-gray-400  px-1 text-gray-700">
              <label className="text-gray-700 " htmlFor="country"></label>
              <input
                spellCheck="false"
                value={country}
                onChange={(e) => setcountry(e.target.value)}
                type="text"
                id="country"
                placeholder="select country*"
                className=" h-7 w-full  outline-none rounded-l-lg px-1 text-gray-600"
                required
              />
            </div>
            <div className="p-2 flex mt-2  justify-between ">
              <div className=" flex items-center w-8/12  h-8  border border-gray-400  px-1 text-gray-700">
                <label className="text-gray-700 " htmlFor="city"></label>
                <input
                  spellCheck="false"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                  type="text"
                  id="city"
                  placeholder="city*"
                  className=" w-full h-7  outline-none rounded-l-lg px-1 text-gray-600"
                  required
                />
                <span className="bi bi-building-fill pl-1 border-l-2 border-gray-300 text-xl "></span>
              </div>
              <div className=" flex items-center w-1/4  h-8 border border-gray-400  px-1 text-gray-700">
                <label className="text-gray-700 " htmlFor="postalcode"></label>
                <input
                  spellCheck="false"
                  value={postalcode}
                  onChange={(e) => setpostalcode(e.target.value)}
                  type="text"
                  id="postalcode"
                  placeholder="postal code*"
                  className=" h-7 w-full outline-none rounded-l-lg px-1text-xl text-gray-600"
                  required
                />
                <span className="bi bi-mailbox2 pl-1 border-l-2  border-gray-300 text-xl "></span>
              </div>
            </div>
            <div className=" flex mx-2  h-8  border border-gray-400  px-1 text-gray-700">
              <label className="text-gray-700 " htmlFor="address"></label>
              <input
                spellCheck="false"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                type="address"
                id="address"
                placeholder="Address*"
                className=" h-7 w-full normal-case  outline-none rounded-l-lg px-1 text-gray-600"
                required
              />
              <span className="bi bi-house-fill pl-1 border-l-2  border-gray-300 text-xl "></span>
            </div>
            <textarea
              spellCheck="false"
              value={descriptionforjob}
              onChange={(e) => setdescriptionforjob(e.target.value)}
              className="border w-[97%] normal-case border-gray-400 text-gray-700 text-md  h-44 p-2 mx-2  mt-2 resize-none outline-none "
              placeholder="Why do You Want this job ??*"
              required
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
              <button
                type="submit"
                className="bg-indigo-900 px-3 text-lg text-white mt-7 "
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Jobapply;
