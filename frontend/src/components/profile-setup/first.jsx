import React from "react";
import TextField from "@mui/material/TextField";

export const First = (props) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    props.setFormData({
      ...props.formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted", props.formData); // Debugging line
      props.setView("second");
    } catch (err) {
      console.error("Error occurred:", err); // Changed to console.error for better error visibility
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-white items-center">
      <div className="border border-black w-[30rem] text-gray-800 rounded h-[86%] shadow bg-[#e0e1dd] flex flex-col">
        <h1 className="text-center py-2 text-xl text-[#1b263b] font-semibold">
          Personal Information
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col h-[92%]"
        >
          <div className="flex flex-col space-y-4 px-6 overflow-auto h-[90%]">
            <TextField
              name="fullName"
              value={props.formData.fullName}
              onChange={handleChange}
              className="p-2 border bg-white rounded"
              label="Full Name"
              variant="filled"
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              value={props.formData.dateOfBirth}
              onChange={handleChange}
              className="p-2 border bg-gray-100 rounded"
              required
            />
            <select
              name="gender"
              value={props.formData.gender}
              onChange={handleChange}
              className="p-2 border bg-gray-100 rounded"
              required
            >
              <option value="" disabled>
                --Select Gender--
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <TextField
              name="address"
              value={props.formData.address}
              onChange={handleChange}
              className="p-2 border bg-white rounded"
              label="Street Address"
              variant="filled"
              required
            />
            <TextField
              name="city"
              value={props.formData.city}
              onChange={handleChange}
              className="p-2 border bg-white rounded"
              label="City"
              variant="filled"
              required
            />
            <TextField
              name="state"
              value={props.formData.state}
              onChange={handleChange}
              className="p-2 border bg-white rounded"
              label="State/Province"
              variant="filled"
              required
            />
            <TextField
              name="postalCode"
              value={props.formData.postalCode}
              onChange={handleChange}
              className="p-2 border bg-white rounded"
              label="Postal Code"
              variant="filled"
              required
            />
            <TextField
              name="country"
              value={props.formData.country}
              onChange={handleChange}
              className="p-2 border bg-white rounded"
              label="Country"
              variant="filled"
              required
            />
            <TextField
              type="number"
              name="phoneNumber"
              value={props.formData.phoneNumber}
              onChange={handleChange}
              className="p-2 border bg-white rounded"
              label="Phone Number"
              variant="filled"
              required
            />
            <TextField
              type="number"
              name="alternatePhoneNumber"
              value={props.formData.alternatePhoneNumber}
              onChange={handleChange}
              className="p-2 border bg-white rounded"
              label="Alternative Number"
            />
            <TextField
              type="email"
              name="emailAddress"
              value={props.formData.emailAddress}
              onChange={handleChange}
              className="p-2 border bg-white rounded"
              label="Email"
              variant="filled"
              required
            />
            <TextField
              type="text"
              name="nationality"
              value={props.formData.nationality}
              onChange={handleChange}
              className="p-2 border bg-white rounded"
              label="Nationality"
              variant="filled"
              required
            />
            <TextField
              name="languagesSpoken"
              value={props.formData.languagesSpoken}
              onChange={(e) =>
                props.setFormData({
                  ...props.formData,
                  languagesSpoken: e.target.value
                    .split(",")
                    .map((lang) => lang.trim()),
                })
              }
              className="p-2 border bg-white rounded"
              label="Languages Spoken (Comma separated)"
              variant="filled"
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 mt-3 m-auto mb-2 bg-blue-700 text-xl flex justify-center text-white w-[90%] rounded"
          >
            Next <i className="bi bi-arrow-right flex items-center pl-2"> </i>
          </button>
        </form>
      </div>
    </div>
  );
};
