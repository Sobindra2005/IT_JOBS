const express=require("express")
const app =express()
const{connectMongoDb}=require("./databaseConnect.js")
const landingPageRoutes=require("./routes/notlogin.js")
const{tokenAuthentication}=require('./middlewares/authenticate.js')
const afterloginRoutes=require("./routes/afterLogin.js")
const path=require('path')
require('dotenv').config()
const cors =require('cors')


const port=3000
const url=process.env.url

app.listen(port,(req,res)=>{
console.log(`server is connected at port: ${port}`)
})
const { Server } = require('socket.io');

app.use(express.json({}))

app.use(cors({
  origin: 'http://localhost:5174', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

connectMongoDb(url)

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'css')))
app.use(express.static(path.join(__dirname,'redirect')))

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')


app.use("/",landingPageRoutes)
app.use("/",tokenAuthentication,afterloginRoutes)