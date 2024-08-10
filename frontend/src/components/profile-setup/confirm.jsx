import React from "react";
import Button from "@mui/material/Button";

export const Confirm = (props) => {
  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="border border-white bg-white rounded p-4 w-[25rem] h-auto">
        <h1 className="text-gray-800 text-lg font-semibold">
          Confirm Profile Setup
        </h1>
        <p className="text-gray-700 text-md mt-2 leading-none">
          You’re about to submit your profile. All provided information will be
          public.
        </p>
        <div className="mt-4 flex justify-end">
          <div className="space-x-4 flex ">
            <Button onClick={() => props.setConfirm(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={props.confirmHandle} type='submit'  variant="contained">Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
