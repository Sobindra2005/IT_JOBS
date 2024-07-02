import Searchcontent from "./components/Searchcontent.jsx";
import Blheader from "./components/blHeader.jsx";
import Afheader from "./components/afHeader.jsx";
import Footer from "./components/footer.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/login.jsx";
import Rheader from "./components/Rheader.jsx";
import Notifications from "./components/Notifications.jsx";
import Message from "./components/Message.jsx";
import Messagebox from "./components/Messagebox.jsx";
import Job from "./components/job.jsx";
import Homecontent from "./components/Homecontent.jsx";
import Profile from "./components/profile.jsx";
import Lheader from "./components/Lheader.jsx";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.jsx";
import Jobposting from "./components/jobPosting/Jobposting.jsx";
import Jobapply from "./components/job-apply/jobapply.jsx";
import axios from "axios";

//api
import messageList from "./api/messageHanlde.js";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [message, setmessage] = useState(false);
  const [notification, setnotification] = useState(false);
  const [jobpost, setjobpost] = useState(false);
  const [jobapply, setjobapply] = useState(false);
  const [MessageList,setMessageList] =useState([])
console.log(MessageList)
  const jobapplyhandle = () => {
    setjobapply(true);
  };

  const removejobapplyhandle = () => {
    setjobapply(false);
  };
  const Messagehandle = async () => {
    await setmessage(!message);
    await  console.log(message)
    if(!message){
    const responce =await messageList()
    setMessageList(responce.data)
  }
  };

  const showJobposthandle = () => {
    return setjobpost(true);
  };

  const removeJobposthandle = () => {
    return setjobpost(false);
  };

  const Notificationhandle = () => {
    setnotification(!notification);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <>
                  <Blheader />
                  <Searchcontent />
                  <Footer />
                </>
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <>
                  <Rheader />
                  <Register />
                  <Footer />
                </>
              )
            }
          />

          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <>
                  <Lheader />
                  <Login />
                </>
              )
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Afheader
                      Messagehandle={Messagehandle}
                      Notificationhandle={Notificationhandle}
                    />
                    {jobapply && (
                      <Jobapply removejobapplyhandle={removejobapplyhandle} />
                    )}
                    {jobpost && (
                      <Jobposting removeJobposthandle={removeJobposthandle} />
                    )}
                    {message && <Message />}
                    {notification && <Notifications />}
                    <Homecontent
                      jobapplyhandle={jobapplyhandle}
                      showJobposthandle={showJobposthandle}
                    />
                  </>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Afheader
                      Messagehandle={Messagehandle}
                      Notificationhandle={Notificationhandle}
                    />
                    {message && <Message />}
                    {notification && <Notifications />}
                    <Profile />
                  </>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Afheader
                      Messagehandle={Messagehandle}
                      Notificationhandle={Notificationhandle}
                    />
                    {message && <Message />}
                    {notification && <Notifications />}
                    <Searchcontent />
                  </>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
