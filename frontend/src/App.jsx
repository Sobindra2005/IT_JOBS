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
import React, { useState } from "react";
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom';
import ProtectedRoute from "./components/protectedRoute/protectedRoute.jsx"


function App() {
const[isAuthenticated,setisAuthenticated]=useState(!!localStorage.getItem('token'))

  return (
<BrowserRouter>
<Routes>
        <Route path="/" element={isAuthenticated?<Navigate to="/home"/>:<><Blheader /><Searchcontent /><Footer /></>} />
        <Route path="/register" element={isAuthenticated?<Navigate to="/home"/>:<><Rheader /><Register /><Footer /></>} />
        <Route path="/login" element={isAuthenticated?<Navigate to="/home"/> :<><Lheader /><Login /></>} />
        <Route path="/home" element={<ProtectedRoute element={<><Afheader /><Homecontent /></>} isAuthenticated={isAuthenticated}/>} />
        <Route path="/profile" element={<ProtectedRoute element={<><Afheader /><Profile /></>} isAuthenticated={isAuthenticated}/>} />
        <Route path="/search" element={<ProtectedRoute element={<><Afheader /><Searchcontent /></>} isAuthenticated={isAuthenticated}/>} />

 </Routes>
 </BrowserRouter>
  );
}

export default App;
