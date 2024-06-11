const express=require("express")
const app =express()
const{connectMongoDb}=require("./databaseConnect.js")
const landingPageRoutes=require("./routes/notlogin.js")
const{tokenAuthentication}=require('./middlewares/authenticate.js')
const afterloginRoutes=require("./routes/afterLogin.js")
const path=require('path')
require('dotenv').config()


const port=process.env.PORT
const url=process.env.url

app.listen(port,(req,res)=>{
console.log(`server is connected at port: ${port}`)
})

connectMongoDb(url)

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'css')))
app.use(express.static(path.join(__dirname,'script')))
app.use(express.static(path.join(__dirname,'controllers')))

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')


app.use("/",landingPageRoutes)
app.use("/aflin",afterloginRoutes)