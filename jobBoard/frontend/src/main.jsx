import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/home.jsx'
import Blheader from './components/blHeader.jsx'
import Footer from './components/footer.jsx'
import './css/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Blheader/>
     <Home/>
    <Footer/>
  </React.StrictMode>,
)
