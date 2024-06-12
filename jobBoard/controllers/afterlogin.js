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

function messagePage(){
    try{  res.render('message')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
}

function notificationsPage(){
    try{  res.render('notifications')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
}

function jobAppliedPage(){
    try{  res.render('jobApplied')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
}
function searchPage(){
    try{  res.render('search')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
}

function profilePage(){
    try{  res.render('profile')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
}


module.exports={homePage,jobAppliedPage,messagePage,notificationsPage,searchPage,profilePage}