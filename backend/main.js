const express=require("express")
const{connectMongoDb}=require("./databaseConnect.js")
const landingPageRoutes=require("./routes/notlogin.js")
const{tokenAuthentication}=require('./middlewares/authenticate.js')
const afterloginRoutes=require("./routes/afterLogin.js")
const authenticatedUserDetails =require("./routes/authenticated.js")
const http=require('http')
const path=require('path')
require('dotenv').config()
const cors =require('cors')
const {Server}=require('socket.io')

const app =express()
const server=http.createServer(app)
const socket=new Server(server)

const port=4000
const url=process.env.url

server.listen(port,(req,res)=>{
console.log(`server is connected at port: ${port}`)
})


app.use(express.json({}))

app.use(cors({
  origin: 'http://localhost:5173', 
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
app.use("/",tokenAuthentication,authenticatedUserDetails)


