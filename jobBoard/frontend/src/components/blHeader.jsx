import '../css/styles.css'

function Blheader(){
    return(
        <>
    <header>
      <div className="top-bar">
        <div className="logo">
          <a href="">
            <h1>Job Board</h1>
          </a>
        </div>
        <div className="nav-buttons">
          <a href="register"> <button className=" btn">Register</button></a>
          <a href="login"> <button className=" btn">Login</button></a>
        </div>
      </div>
    </header>
        </>
    
    )
}

export default Blheader
