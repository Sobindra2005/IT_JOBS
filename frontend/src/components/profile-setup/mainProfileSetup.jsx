import React, { useEffect, useState } from "react";
import { SkillSuggestion } from "./setup";
import { Second } from "./second";
import { Third } from "./third";
import { Confirm } from "./confirm.jsx";

export const MainSetup = (props) => {
  const [userDetails, setUserDetails] = useState({});
  const [view, setView] = useState("third");
  const [confirm, setConfirm] = useState(false);
console.log(confirm)
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
      {view === "second" && <Second setView={setView} />}
      {view === "third" && <Third setConfirm={setConfirm}/>}
      {confirm && <Confirm setConfirm={setConfirm}/>}
    </>
  );
};
