require('dotenv').config()
const port = process.env.PORT

function homePage(req,res){
    try{  res.render('home')}
    catch(err)
    {
        console.log(` error is ${err}`)
    }
  
}


module.exports={homePage}