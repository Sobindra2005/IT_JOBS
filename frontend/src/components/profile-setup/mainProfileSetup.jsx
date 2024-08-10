import React, { useEffect, useState } from "react";
import { First } from "./first";
import { Second } from "./second";
import { Third } from "./third";
import { Confirm } from "./confirm.jsx";
import {useNavigate} from 'react-router-dom'
import { ProfileSetup } from "../../api/profileSetup.js";


export const MainSetup = (props) => {
  const [view, setView] = useState("first");
  const [confirm, setConfirm] = useState(false);
  const navigate=useNavigate()

  const [link, setlink] = useState({
    protofolio: "",
  });
  console.log(link);
  const [formData, setFormData] = useState({
    fullName: `${props.authenticatedUserDetails.firstName} ${props.authenticatedUserDetails.lastName}`,
    dateOfBirth: "",
    gender: `${props.authenticatedUserDetails.gender}`,
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    emailAddress: `${props.authenticatedUserDetails.email}`,
    nationality: "",
    languagesSpoken: [],
  });

  const [profilePic, setProfilePic] = useState(null);




  const confirmHandle = async () => {
    const formdata = new FormData();
    formdata.append("formData", JSON.stringify(formData));
    formdata.append("profilePic", profilePic);
    formdata.append("link", JSON.stringify(link));
    try {
      const responce = await ProfileSetup(formdata);

      console.log(responce);
      if(responce.status==200){
        setConfirm(false)
        props.setshowSuccess(true);
        props.setpopupmessage("Your profile information has been updated successfully !");
        props.setshowpopup(true);
        navigate("/home")
      }
    } catch (err) {
      console.log("error occured ", err);
    }
  };
  useEffect(() => {
    if (props.authenticatedUserDetails) {
      setFormData({
        fullName: `${props.authenticatedUserDetails.firstName} ${props.authenticatedUserDetails.lastName}`,
        dateOfBirth: "",
        gender: props.authenticatedUserDetails.gender,

        city: "",
        state: "",
        postalCode: "",
        country: "",
        phoneNumber: "",

        emailAddress: props.authenticatedUserDetails.email,
        nationality: "",
        languagesSpoken: [],
      });
    }
  }, [props.authenticatedUserDetails]);

  return (
    <>
      {view === "first" && (
        <First
          formData={formData}
          setFormData={setFormData}
          setView={setView}
        />
      )}
      {view === "second" && (
        <Second
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          setView={setView}
        />
      )}
      {view === "third" && (
        <Third
          setConfirm={setConfirm}
          link={link}
          setFormData={setFormData}
          formData={formData}
          setlink={setlink}
        />
      )}
      {confirm && (
        <Confirm setConfirm={setConfirm} confirmHandle={confirmHandle} />
      )}
    </>
  );
};
