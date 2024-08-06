import React, { useEffect, useState } from "react";
import { SkillSuggestion } from "./setup";
import { Second}  from "./second";
import {Third} from './third'
export const MainSetup = (props) => {
  const [userDetails, setUserDetails] = useState({});
  const [view, setView] = useState("third");

  useEffect(() => {
    if (props.authenticatedUserDetails) {
      setUserDetails(props.authenticatedUserDetails);
    }
  }, [props.authenticatedUserDetails]);

  return (
    <>
      {view === "first" && (
        <SkillSuggestion userDetails={userDetails} setView={setView} />
      )}
      {view === "second" && <Second />}
      {view ==="third" && <Third/>}
    </>
  );
};
