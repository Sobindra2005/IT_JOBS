import react from "react";

const JobForm = (props) => {
  return (
    <>
      <div className=" my-5 ml-7 flex flex-col gap-y-3 ">
        <div>
          <label className="text-lg " htmlFor="JobTitle">
            Job Title* :{" "}
          </label>
          <input
            value={props.jobTitle}
            onChange={(e) => props.setjobTitle(e.target.value)}
            className=" p-1 w-auto  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="JobTitle"
          required/>
        </div>
        <div>
          <label className="text-lg " htmlFor="companyName">
            Company Name* :{" "}
          </label>
          <input
            value={props.companyName}
            onChange={(e) => props.setcompanyName(e.target.value)}
            className=" p-1 w-auto  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="companyName"
          required/>
        </div>
        <div>
          <label className=" text-lg flex items-start" htmlFor="aboutCompany">
            About Company*:{" "}
          </label>
          <textarea
            value={props.companyDescription}
            onChange={(e) => props.setcompanyDescription(e.target.value)}
            className=" w-full resize-none p-1 h-20  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="aboutCompany"
         required />
        </div>
        <div className=" border-y border-gray-600 p-0.5 my-2 mb-6 "></div>
        <div>
          <label className="flex justify-start text-lg  " htmlFor="aboutjob">
            Job overview* :{" "}
          </label>
          <textarea
            value={props.jobOverview}
            onChange={(e) => props.setjobOverview(e.target.value)}
            className=" resize-none p-1 w-full  normal-case outline-none  border  h-20 border-gray-300 text-gray-700 text-md "
            type="text"
            id="aboutjob"
         required />
        </div>

        <div>
          <label
            className="flex justify-start text-lg "
            htmlFor="responsebility"
          >
            Key Responsibilities* :{" "}
          </label>
          <textarea
            value={props.responsibilities}
            onChange={(e) => props.setresponsibilities(e.target.value)}
            className=" resize-none p-1 w-full  normal-case outline-none  border  h-20 border-gray-300 text-gray-700 text-md "
            type="text"
            id="responsebility"
          required/>
        </div>
        <div>
          <label className="text-lg " htmlFor="skills">
            Required Skills* :{" "}
          </label>
          <input
            value={props.skills}
            onChange={(e) => props.setskills(e.target.value)}
            className=" p-1 w-2/4  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="skills"
         required />
        </div>
        <div>
          <label className="text-lg " htmlFor="qualification">
            Required Qualification* :{" "}
          </label>
          <input
            value={props.qualifications}
            onChange={(e) => props.setqualifications(e.target.value)}
            className="  p-1 w-2/4  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="qualification"
         required />
        </div>
        <div className=" border-y border-gray-600 p-0.5 my-2 mb-6 "></div>
        <div>
          <label className="text-lg " htmlFor="location">
            Location* :{" "}
          </label>
          <input
            value={props.location}
            onChange={(e) => props.setlocation(e.target.value)}
            className=" p-1setqualifications w-auto  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="location"
          required/>
        </div>
        <div>
          <label
           
            className="text-lg "
            htmlFor="skills"
          >
            Employement Type* :{" "}
          </label>
          <select
           value={props.employmentType}
           onChange={(e) => props.setemploymentType(e.target.value)}
            className=" p-1 w-auto  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="skills"
          required>
          <option value="" disabled>Select type</option>
            <option value="full-time">Full time</option>
            <option value="part-time">Part time</option>
            <option value="internship">Internship</option>
            <option value="Traineeship">Traineeship</option>
          </select>
        </div>
        <div>
          <label className="text-lg " htmlFor="salary">
            Salary(NPR) :{" "}
          </label>
          <input
            value={props.salary}
            onChange={(e) => props.setsalary(e.target.value)}
            className=" p-1 w-auto  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="salary"
          />
        </div>
        <div>
          <label className="text-lg " htmlFor="workingTime">
            Working hours(hrs)*:{" "}
          </label>
          <input
            value={props.workingTime}
            onChange={(e) => props.setworkingTime(e.target.value)}
            className=" p-1   normal-case outline-none  border border-gray-300 w-10 text-gray-700 text-md "
            id="workingTime"
          required/>
        </div>
        <div>
          <label className="text-lg " htmlFor="applicationdeadline">
            Application Deadline :{" "}
          </label>
          <input
            value={props.applicationDeadline}
            onChange={(e) => props.setapplicationDeadline(e.target.value)}
            className=" p-1 w-auto  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="date"
            id="applicationdeadline"
          />
        </div>
        <div>
          <label className="text-lg " htmlFor="startDate">
           Job Start Date :{" "}
          </label>
          <input
            value={props.startDate}
            onChange={(e) => props.setstartDate(e.target.value)}
            className=" p-1 w-auto  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="date"
            id="startDate"
          />
        </div>
        <div className=" border-y border-gray-600 p-0.5 my-2 mb-6 "></div>

        <div>
          <label className=" text-lg flex items-start" htmlFor="applyprocess">
            Apply Process*:
          </label>
          <textarea
            value={props.applyProcess}
            onChange={(e) => props.setapplyProcess(e.target.value)}
            className=" w-full resize-none p-1 h-20  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="applyprocess"
         required />
        </div>
        <div>
          <label className="text-lg " htmlFor="phone">
            Contact Number*:
          </label>
          <input
            value={props.contactNumber}
            onChange={(e) => props.setcontactNumber(e.target.value)}
            className=" ml-1 p-1 w-auto  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="phone"
          required/>
        </div>
        <div>
          <label className="text-lg " htmlFor="email">
            Email*:
          </label>
          <input
            value={props.email}
            onChange={(e) => props.setemail(e.target.value)}
            className=" ml-1 p-1 w-auto  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="email"
            id="email"
          required/>
        </div>
        <div>
          <label className=" text-lg flex items-start" htmlFor="addinformtaion">
           Additional Information :{" "}
          </label>
          <textarea
            value={props.additionalInformation}
            onChange={(e) => props.setadditionalInformation(e.target.value)}
            className=" w-full resize-none p-1 h-20  normal-case outline-none  border border-gray-300 text-gray-700 text-md "
            type="text"
            id="aboutCompany"
          />
        </div>
        <div className=" border-b border-gray-600 p-0.5 my-2  "></div>
      </div>
    </>
  );
};

export default JobForm;
