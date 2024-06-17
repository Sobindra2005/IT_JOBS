import '../css/Rhead.css'

function Rheader(){
  return(

    <>
    <header className="h-16 z-10">
        <a href="/">
            <h1 className="text-3xl font-bold">Job Board</h1>
        </a>
        <nav>
            <ul>
                <li><a className="hover:underline" href="/">Home</a></li>
                <li><a className="hover:underline" href="/login">Login</a></li>
            </ul>
        </nav>
    </header>
    </>
  )  
}

export default Rheader