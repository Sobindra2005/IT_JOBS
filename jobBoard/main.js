const express=require("express")
const app =express()
const port=8000
const landingPageRoutes=require("./routes/landingPage.js")
const path=require('path')
app.listen(port,(req,res)=>{
console.log(`server is connected at port: ${port}`)
})

app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'css')))
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use("/",landingPageRoutes)