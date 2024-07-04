// ProjectTable.js
import React from "react";
import Left from "./profile/left-component";
import Center from "./profile/center-component";
import Right from "./profile/right-component";

function Profile (props){
  return (
   <div className=" w-screen mt-16 flex felx-row h-screen ">
   <Left/>
   <Center authenticatedUserDetails={props.authenticatedUserDetails}/>
   <Right authenticatedUserDetails={props.authenticatedUserDetails}/>
    </div>
  )
}

export default Profile;
