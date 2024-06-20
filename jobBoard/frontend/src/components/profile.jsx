// ProjectTable.js
import React from "react";
import Left from "./profile/left-component";
import Center from "./profile/center-component";
import Right from "./profile/right-component";

function Profile (){
  return (
   <div className=" w-screen mt-16 flex felx-row h-screen ">
   <Left/>
   <Center/>
   <Right/>
    </div>
  )
}

export default Profile;
