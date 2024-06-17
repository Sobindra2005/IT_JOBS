import Searchcontent from "./components/Searchcontent.jsx";
import Blheader from "./components/blHeader.jsx";
import Afheader from "./components/afHeader.jsx";
import Footer from "./components/footer.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/login.jsx";
import Rheader from "./components/Rheader.jsx";
import Notifications from "./components/Notifications.jsx";
import Rightside from "./components/Rightside.jsx";
import Leftside from "./components/Leftside.jsx";

function App() {
  return (
    <div className="flex flex-col">
      <Afheader/>
      <div className="flex flex-row">
        <Leftside/>
      <Searchcontent/>
      <Notifications/>
      </div>


    </div>
  );
}

export default App;
