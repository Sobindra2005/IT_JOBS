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
import io from "socket.io-client";

//api
import { messageList } from "./api/messageHanlde.js";
import AuthenticatedUser from "./api/authenticatedUserDetails.js";

axios.defaults.timeout = 10000;

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [socket, setSocket] = useState(null);
  const [selectUserMsg, setSelectUserMsg] = useState("");
  const [authenticatedUserDetails, setAuthenticatedUserDetails] = useState([]);
  const [message, setmessage] = useState(false);
  const [messagebox, setmessagebox] = useState(false);
  const [notification, setnotification] = useState(false);
  const [jobpost, setjobpost] = useState(false);
  const [jobapply, setjobapply] = useState(false);
  const [MessageList, setMessageList] = useState([]);
  const [chatId, setchatId] = useState("");
  const [allmsg, setAllmsg] = useState("");

  console.log(allmsg);
  const DataAuthenticated = async () => {
    const data = await AuthenticatedUser();
    return setAuthenticatedUserDetails(data.data);
  };

  useEffect(() => {
    DataAuthenticated();
    if (isAuthenticated) {
      const newSocket = io("http://localhost:4000", {
        withCredentials: true,
      });
      console.log(newSocket);
      return () => newSocket.disconnect();
    }
  }, [isAuthenticated]);

  const jobapplyhandle = () => {
    setjobapply(true);
  };

  const removejobapplyhandle = () => {
    setjobapply(false);
  };
  const Messagehandle = async () => {
    await setmessage(!message);
    await console.log(message);
    if (!message) {
      const responce = await messageList();
      setMessageList(responce.data);
    }
  };

  const showMessageBox = (data, chatId, msg) => {
    setSelectUserMsg(data);
    setmessagebox(true);
    setchatId(chatId);
    setAllmsg(msg);
  };

  const updateMsg = (msg) => {
    setAllmsg(msg);
  };
  const removeMessageBox = () => {
    setmessagebox(false);
    setSelectUserMsg("");
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
                    {messagebox && (
                      <Messagebox
                        updateMsg={updateMsg}
                        setAllmsg={setAllmsg}
                        allmsg={allmsg}
                        authenticatedUserDetails={authenticatedUserDetails}
                        chatId={chatId}
                        selectUserMsg={selectUserMsg}
                        removeMessageBox={removeMessageBox}
                      />
                    )}

                    {message && (
                      <Message
                        allmsg={allmsg}
                        authenticatedUserDetails={authenticatedUserDetails}
                        showMessageBox={showMessageBox}
                        MessageList={MessageList}
                      />
                    )}
                    {notification && <Notifications />}

                    <Homecontent
                      authenticatedUserDetails={authenticatedUserDetails}
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
                    {messagebox && (
                      <Messagebox
                        updateMsg={updateMsg}
                        setAllmsg={setAllmsg}
                        allmsg={allmsg}
                        authenticatedUserDetails={authenticatedUserDetails}
                        chatId={chatId}
                        selectUserMsg={selectUserMsg}
                        removeMessageBox={removeMessageBox}
                      />
                    )}

                    {message && (
                      <Message
                        allmsg={allmsg}
                        authenticatedUserDetails={authenticatedUserDetails}
                        showMessageBox={showMessageBox}
                        MessageList={MessageList}
                      />
                    )}
                    {notification && <Notifications />}
                    <Profile
                      authenticatedUserDetails={authenticatedUserDetails}
                    />
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
                    {messagebox && (
                      <Messagebox
                        updateMsg={updateMsg}
                        setAllmsg={setAllmsg}
                        allmsg={allmsg}
                        authenticatedUserDetails={authenticatedUserDetails}
                        chatId={chatId}
                        selectUserMsg={selectUserMsg}
                        removeMessageBox={removeMessageBox}
                      />
                    )}

                    {message && (
                      <Message
                        allmsg={allmsg}
                        authenticatedUserDetails={authenticatedUserDetails}
                        showMessageBox={showMessageBox}
                        MessageList={MessageList}
                      />
                    )}
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
