require('dotenv').config()
const port = process.env.PORT
const { User } = require("../models/register")
const { setuser, getUser, setUser } = require("../services/authentication")
const bcrypt=require('bcrypt')

function landingPage(req, res) {
    try {
        res.render('landingpage')
    }
    catch (err) {
        console.log("error occur ", err)
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
        const { email, password } = await req.body
        if (!email || !password) return res.redirect("/login")
        const user = await User.findOne({ email })
        if (!user) return res.status(401).redirect("/login")
        const userPassword = await user.password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) return res.status(401).redirect("/login")
        if (user && passwordMatch) {
            const token = setUser(user)
            res.redirect("/aflin/home")
        }
        else{
            console.log('err occur')
        }

    }
    catch (err) {
console.log("login failed!!",err)
    res.send(err)

    }
}

function registerPage(req, res) {
    try {
        res.render('register', { port })
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