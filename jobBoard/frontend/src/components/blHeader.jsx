import "../css/styles.css";

function Blheader() {
  return (
    <>
      <header className="bg-custom-head z-10 p-3 w-screen fixed top-0">
        <div className="top-bar text-white w-screen flex flex-row items-center">
          <div className=" logo text-3xl font-bold ">
            <a href="">
              <h1>Job Board</h1>
            </a>
          </div>
          <div className="nav-buttons">
            <a href="register">
              <button className=" btn">Register</button>
            </a>
            <a href="login">
        
              <button className=" btn">Login</button>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Blheader;
