
import '../css/styles.css'

import { Link } from 'react-router-dom'
function Lheader(){
  return(

    <>
    <header className="h-16 z-10">
        <Link to="/">
            <h1 className="text-3xl font-bold">Job Board </h1>
        </Link>
        <nav>
            <ul>
                <li><Link className="hover:underline" to="/">Home</Link></li>
                <li><Link className="hover:underline" to="/Register">Register</Link></li>
            </ul>
        </nav>
    </header>
    </>
  )  
}

export default Lheader