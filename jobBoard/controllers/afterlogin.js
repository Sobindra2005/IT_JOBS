require('dotenv').config()
const port = process.env.PORT
const { jobData }=require('../jobdemo/demo.js')
const{Set}=require('core-js')

function homePage(req,res){
    try{  res.render('home',{ jobData , Set })}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
  
}

function redirectMessage(){
    try{  res.render('message')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
}

function redirectNotifications(){
    try{  res.render('notifications')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
}

function redirectJobApplied(){
    try{  res.render('jobApplied')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
}
function redirectSearch(){
    try{  res.render('search')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
}

function redirectProfile(){
    try{  res.render('profile')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
}


module.exports={homePage,redirectJobApplied,redirectMessage,redirectNotifications,redirectSearch,redirectProfile}