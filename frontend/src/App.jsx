import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

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
import Homecontent from "./components/Homecontent.jsx";
import Profile from "./components/profile.jsx";
import Lheader from "./components/Lheader.jsx";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.jsx";
import Jobposting from "./components/jobPosting/Jobposting.jsx";
import Jobapply from "./components/job-apply/jobapply.jsx";

import { messageList } from "./api/messageHanlde.js";
import AuthenticatedUser from "./api/authenticatedUserDetails.js";


axios.defaults.timeout = 10000;

let socket;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [selectUserMsg, setSelectUserMsg] = useState("");
  const [authenticatedUserDetails, setAuthenticatedUserDetails] = useState([]);
  const [message, setMessage] = useState(false);
  const [messagebox, setMessagebox] = useState(false);
  const [notification, setNotification] = useState(false);
  const [jobpost, setJobpost] = useState(false);
  const [jobapply, setJobapply] = useState(false);
  const [MessageList, setMessageList] = useState([]);
  const [chatId, setChatId] = useState("");
  const [allmsg, setAllmsg] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const DataAuthenticated = async () => {
    const data = await AuthenticatedUser();
    setAuthenticatedUserDetails(data.data);
  };




  useEffect(() => {
    DataAuthenticated();

    if (isAuthenticated) {
      console.log("Establishing socket connection...");
      socket = io("http://localhost:4000", {
        withCredentials: true,
      });
      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
      });

      socket.on("message received", (allMsg) => {
        console.log("Message received in frontend:", allMsg);
        setAllmsg(allMsg);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
      });

      return () => {
        console.log("Cleaning up socket listeners and disconnecting...");
        socket.off("message received");
        socket.disconnect();
      };
    }
  }, [isAuthenticated]);





  const jobapplyhandle = () => {
    setJobapply(true);
  };

  const removejobapplyhandle = () => {
    setJobapply(false);
  };

  const Messagehandle = async () => {
    setMessage(!message);
    if (!message) {
      const response = await messageList();
      setMessageList(response.data);
    }
  };

  const showMessageBox = (data, chatId, msg) => {
    console.log("Selected User Message ID:", chatId);
    if (socket) {
      socket.emit("join chat", chatId);
    }
    setSelectUserMsg(data);
    setMessagebox(true);
    setChatId(chatId);
    setAllmsg(msg);
  };

  const sendMessage = (chatId) => {
    if (socket && chatId) {
      socket.emit("send message", chatId);
    }
  };

  const updateMsg = (msg) => {
    setAllmsg(msg);
  };

  const removeMessageBox = () => {
    setMessagebox(false);
    setSelectUserMsg("");
  };

  const showJobposthandle = () => {
    setJobpost(true);
  };

  const removeJobposthandle = () => {
    setJobpost(false);
  };

  const Notificationhandle = () => {
    setNotification(!notification);
  };

  return (
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
                      sendMessage={sendMessage}
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
                      sendMessage={sendMessage}
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
                      sendMessage={sendMessage}
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
  );
}

export default App;
