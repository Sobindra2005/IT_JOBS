import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
return(
  < Route {...rest} render={(props)=> isAuthenticated?<Component {...props}/> : <Navigate to="/login" />
  } />
)
};


export default ProtectedRoute