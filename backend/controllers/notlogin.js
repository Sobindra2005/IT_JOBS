require('dotenv').config()
const port = process.env.PORT
const { User } = require("../models/register")
const { getUser, setUser } = require("../services/authentication")
const bcrypt = require('bcrypt')


async function loginPost(req, res) {
   

        const { email, password } = await req.body;
        const userData = await User.findOne({ email })
        const userPassword = await userData.password
        const passwordMatch = await bcrypt.compare(password, userData.password)

        if (!email || !password) {
          return res.status(400).json({ msg: "email and password is required" });
        }
        if (!userData) {
          return  res.status(404).json({ msg: "user not found!!" })
            console.log('err')
        }
        if (!passwordMatch) {
          return  res.status(401).json({ msg: 'invalid credentials' })
        }
        if (passwordMatch) {
            const token = setUser(userData)
           return res.status(200).json(token)
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
        res.status(200).json({ msg: 'sucessfully registered' })
    }
    catch (err) {
        res.status(500).send({ msg: 'Error occur in the server ' })
        console.log(`error is: ${err}`)
    }
}

function loginPage(req, res) {
    res.status(200).json({ msg: 'login page' })
    console.log('login page')
}


function registerPage(req, res) {
    res.status(200).json({ msg: 'register  page' })
    console.log('register page')
}

function landingPage(req, res) {
    res.status(200).json({ msg: 'login page' })
    console.log('landing page')
}

module.exports = { loginPost, registerPost, loginPage, registerPage, landingPage }