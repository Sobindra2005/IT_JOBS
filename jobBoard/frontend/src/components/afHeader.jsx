import '../css/styles.css'

function Afheader() {
  return (
    <>
      <header className='bg-custom-head z-10 p-4 w-screen fixed top-0'>
        <div className=" top-bar flex flex-row justify-between w-screen items-center pr-2 ">
          <div className="logo text-3xl font-bold">
            <a className="no-underline text-white cursor-pointer" href="">
              <h1>Job Board</h1>
            </a>
          </div>
          <div className="nav-bar m-0 p-0 flex items-center w-96  cursor-pointer">
            <div>
              <i id="home" className="bi bi-house"></i>
            </div>
           
            <div>
              <i className="bi bi-briefcase"></i>
            </div>
            <div>
              <i className="bi bi-search"></i>
            </div>
          </div>
          <div className="profile flex flex-row justify-between w-44 ">
          <div>
              <i className="bi bi-chat-left-text"></i>
            </div>
            <div>
              <i className="bi bi-bell"></i>
            </div>
            <div id="profile-button">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Afheader
