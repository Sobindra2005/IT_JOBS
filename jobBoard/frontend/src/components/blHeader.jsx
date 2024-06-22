import "../css/styles.css";
import { Link } from 'react-router-dom';

function Blheader() {
  return (
    <>
      <header className="bg-custom-head z-10 p-3 w-screen fixed top-0">
        <div className="top-bar text-white w-screen flex flex-row items-center">
          <div className=" logo text-3xl font-bold ">
            <Link to="">
              <h1>Job Board</h1>
            </Link>
          </div>
          <div className="nav-buttons">
            <Link to="register">
              <button className=" btn">Register</button>
            </Link>
            <Link to="login">
        
              <button className=" btn">Login</button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Blheader;
