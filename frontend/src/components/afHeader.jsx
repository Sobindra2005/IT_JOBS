import { NavLink } from 'react-router-dom';
import '../css/styles.css'

function Afheader() {
  return (
    <>
      <header className='bg-custom-head z-10 p-4 w-screen fixed top-0'>
        <div className=" top-bar flex flex-row justify-between w-screen items-center pr-2 ">
          <div className="logo text-3xl font-bold">
            <a className="no-underline text-white cursor-pointer" href="">
              <h1>IT Jobs</h1>
            </a>
          </div>
          <div className="nav-bar m-0 p-0 flex items-center w-96  cursor-pointer">
            <div>
             <NavLink to="/home" activeClassName="" > <i id="home" className="bi bi-house"></i></NavLink> 
            </div>
           
            <div>
            <NavLink to="/job">  <i className="bi bi-briefcase"></i></NavLink> 
            </div>
            <div>
            <NavLink to="/search">  <i className="bi bi-search"></i></NavLink> 
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
            <NavLink to="/profile">     <i className="bi bi-person"></i></NavLink> 
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Afheader
