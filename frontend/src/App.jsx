import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

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
import { Success, Error } from "./components/popup/popup.jsx";
import Comment from "./components/comment /comment.jsx";
import { socket } from "./socket.js";
import Applicant from "./components/job-section-view/applicant.jsx";
import Jobcreator from "./components/job-section-view/Jobcreatorview.jsx";
import JobseekerView from "./components/job-section-view/JobseekerView.jsx";

axios.defaults.timeout = 10000;

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
  const [showpopup, setshowpopup] = useState(false);
  const [popupmessage, setpopupmessage] = useState("");
  const [showSuccess, setshowSuccess] = useState(false);
  const [showError, setshowError] = useState(false);
  const [jobAuthorId, setjobAuthorId] = useState("");
  const [comment, setcomment] = useState(false);
  const [commentPost, setcommentPost] = useState([]);
  const [jobView, setJobView] = useState(false);
  const [jobapplypostId, setjobapplypostId] = useState("");
  const [applicant, setapplicant] = useState(false);
  const [applicantList, setApplicantList] = useState([]);
console.log(applicantList)
  const DataAuthenticated = async () => {
    const data = await AuthenticatedUser();

    if (!data) {
      await localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = null;
      props.setshowError(true);
      props.setpopupmessage("Session Time out !!");
      props.setshowpopup(true);
      window.location.reload();
    } else {
      setAuthenticatedUserDetails(data.data);
    }
  };

  useEffect(() => {
    DataAuthenticated();

    if (isAuthenticated) {
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
    }
  }, [isAuthenticated]);

  const jobapplyhandle = async (AuthorId, postId) => {
    console.log(AuthorId, postId);
    setJobapply(true);
    setjobAuthorId(AuthorId);
    setjobapplypostId(postId);
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

  const commenthandle = (responce) => {
    setcomment(true);
    setcommentPost(responce);
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
                <Register
                  setshowError={setshowError}
                  setshowSuccess={setshowSuccess}
                  setpopupmessage={setpopupmessage}
                  setshowpopup={setshowpopup}
                />
                <Footer />
                {showSuccess && (
                  <Success
                    showpopup={showpopup}
                    setshowSuccess={setshowSuccess}
                    setshowpopup={setshowpopup}
                    popupmessage={popupmessage}
                  />
                )}
                {showError && (
                  <Error
                    showpopup={showpopup}
                    setshowError={setshowError}
                    setshowpopup={setshowpopup}
                    popupmessage={popupmessage}
                  />
                )}
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
                <Login
                  setshowError={setshowError}
                  setshowSuccess={setshowSuccess}
                  setpopupmessage={setpopupmessage}
                  setshowpopup={setshowpopup}
                />

                {showSuccess && (
                  <Success
                    showpopup={showpopup}
                    setshowSuccess={setshowSuccess}
                    setshowpopup={setshowpopup}
                    popupmessage={popupmessage}
                  />
                )}
                {showError && (
                  <Error
                    showpopup={showpopup}
                    setshowError={setshowError}
                    setshowpopup={setshowpopup}
                    popupmessage={popupmessage}
                  />
                )}
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
                  {comment && (
                    <Comment
                      jobapplyhandle={jobapplyhandle}
                      showJobposthandle={showJobposthandle}
                      authenticatedUserDetails={authenticatedUserDetails}
                      setcomment={setcomment}
                      commentPost={commentPost}
                    />
                  )}
                  {jobapply && (
                    <Jobapply
                      jobapplypostId={jobapplypostId}
                      setshowError={setshowError}
                      setshowSuccess={setshowSuccess}
                      setpopupmessage={setpopupmessage}
                      setshowpopup={setshowpopup}
                      jobAuthorId={jobAuthorId}
                      authenticatedUserDetails={authenticatedUserDetails}
                      removejobapplyhandle={removejobapplyhandle}
                    />
                  )}
                  {showSuccess && (
                    <Success
                      showpopup={showpopup}
                      setshowSuccess={setshowSuccess}
                      setshowpopup={setshowpopup}
                      popupmessage={popupmessage}
                    />
                  )}
                  {showError && (
                    <Error
                      showpopup={showpopup}
                      setshowError={setshowError}
                      setshowpopup={setshowpopup}
                      popupmessage={popupmessage}
                    />
                  )}

                  {jobpost && (
                    <Jobposting
                      setshowError={setshowError}
                      setshowSuccess={setshowSuccess}
                      setpopupmessage={setpopupmessage}
                      setshowpopup={setshowpopup}
                      authenticatedUserDetails={authenticatedUserDetails}
                      removeJobposthandle={removeJobposthandle}
                    />
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
                    commenthandle={commenthandle}
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
          path="/job"
          element={
            <ProtectedRoute
              element={
                <>
                  <Afheader
                    Messagehandle={Messagehandle}
                    Notificationhandle={Notificationhandle}
                  />
                  {showSuccess && (
                    <Success
                      showpopup={showpopup}
                      setshowSuccess={setshowSuccess}
                      setshowpopup={setshowpopup}
                      popupmessage={popupmessage}
                    />
                  )}
                  {showError && (
                    <Error
                      showpopup={showpopup}
                      setshowError={setshowError}
                      setshowpopup={setshowpopup}
                      popupmessage={popupmessage}
                    />
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
                  {jobView ? (
                    <Jobcreator
                      setapplicant={setapplicant}
                      setJobView={setJobView}
                      setApplicantList={setApplicantList}
                    />
                  ) : (
                    <JobseekerView setJobView={setJobView} />
                  )}
                  {applicant && (
                    <Applicant
                    setApplicantList={setApplicantList}

                      applicantList={applicantList}
                      setapplicant={setapplicant}
                    />
                  )}
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
                    setshowSuccess={setshowSuccess}
                    setpopupmessage={setpopupmessage}
                    setshowpopup={setshowpopup}
                    authenticatedUserDetails={authenticatedUserDetails}
                  />
                  {showSuccess && (
                    <Success
                      showpopup={showpopup}
                      setshowpopup={setshowpopup}
                      popupmessage={popupmessage}
                    />
                  )}
                  {showError && (
                    <Error
                      showpopup={showpopup}
                      setshowpopup={setshowpopup}
                      popupmessage={popupmessage}
                    />
                  )}
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
                  {showSuccess && (
                    <Success
                      showpopup={showpopup}
                      setshowpopup={setshowpopup}
                      popupmessage={popupmessage}
                    />
                  )}
                  {showError && (
                    <Error
                      showpopup={showpopup}
                      setshowpopup={setshowpopup}
                      popupmessage={popupmessage}
                    />
                  )}
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
