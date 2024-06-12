require('dotenv').config()
const port = process.env.PORT
const { User } = require("../models/register")
const { setuser, getUser, setUser } = require("../services/authentication")
const bcrypt = require('bcrypt')
const { jobData }=require('../jobdemo/demo.js')
const{Set}=require('core-js')


function landingPage(req, res) {
    try {
        res.render('landingpage',{jobData , Set })
    }
    catch (err) {
        console.log("error occur ", err)
    }
    {

    }
}
function loginPage(req, res) {
    try {
        res.render('loginpage', { port })

    }
    catch (err) {
        console.log(`error is ${err}`)
        res.status(500).send('Internal server Error!!')
    }
}
async function loginPost(req, res) {
    try {
      
        const { email, password } = req.body;
        const userData = await User.findOne({ email })
        const userPassword= await userData.password
        const passwordMatch = await bcrypt.compare(password, userData.password)
        if (!email || !password) {
            res.status(400).send({ msg: "email and password is required" });
        }
        if (!userData) {
            res.status(404).send({ msg: "user not found!!" })
        }
        if (passwordMatch) {
            const token = setUser(userData)
            res.status(200).redirect('/aflin/home')

        }
        else {
            res.status(401).send({ msg: "incorrect password!!" })
        }
     


    }
    catch(err){

        console.log(`${err}`)
    }
}

function registerPage(req, res) {
    try {
        return res.render('register', { port })
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!')
    }
}

async function registerPost(req, res) {
    try {
        const { firstName, lastName, email, password, gender, roles } = req.body;
        await User.create({
            firstName,
            lastName,
            email,
            password,
            gender,
            roles
        }
        )

        res.redirect('/login')
    }
    catch (err) {
        res.status(500).send({ msg: 'Error occur in the server ' })
        console.log(`error is: ${err}`)
    }
}



module.exports = { landingPage, loginPage, loginPost, registerPage, registerPost }