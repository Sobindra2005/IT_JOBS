import '../css/styles.css'


function Afheader() {
  return (
    <>
      <header>
        <div className="top-bar">
          <div className="logo">
            <a href="">
              <h1>Job Board</h1>
            </a>
          </div>
          <div className="nav-bar">
            <div>
              <i id="home" className="bi bi-house"></i>
            </div>
            <div>
              <i className="bi bi-chat-left-text"></i>
            </div>
            <div>
              <i className="bi bi-bell"></i>
            </div>
            <div>
              <i className="bi bi-briefcase"></i>
            </div>
            <div>
              <i className="bi bi-search"></i>
            </div>
          </div>
          <div className="profile">
            <div id="profile-button">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Afheader;
