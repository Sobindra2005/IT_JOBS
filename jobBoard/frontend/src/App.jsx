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
import Jobapplied from "./components/Jobapplied.jsx";
import Homecontent from "./components/Homecontent.jsx";

function App() {
  return (
    <div className="flex flex-col">
      <Afheader/>
      <div className="flex flex-row">
      <Notifications/>
      <Homecontent/>
      <Message/>
      </div>


    </div>
  );
}

export default App;
