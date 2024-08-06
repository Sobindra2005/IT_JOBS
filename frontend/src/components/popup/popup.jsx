import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';

export const Success = (props) => {
  {
    if (props.showpopup) {
      setTimeout(() => {
        props.setshowpopup(false);
        props.setshowSuccess(false);
      }, 9000);
    }
  }
  return (
    <div className={` animate-popup z-999 fixed bottom-4 right-4    `}>
      <Alert variant="outlined" severity="success">
      <AlertTitle>Success</AlertTitle>
        {props.popupmessage}
      </Alert>
    </div>
  );
};

export const Error = (props) => {
  {
    if (props.showpopup) {
      setTimeout(() => {
        props.setshowpopup(false);
        props.setshowError(false);
      }, 9000);
    }
  }
  return (
    <div className={` animate-popup z-999 fixed bottom-4 right-4 `}>
      <Alert variant="outlined" severity="error">
        {" "}
        <AlertTitle>Error</AlertTitle>
        {props.popupmessage}
      </Alert>
    </div>
  );
};
