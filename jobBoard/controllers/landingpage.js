
function landingPage(req,res){
    try{
        res.render('landingpage')
    }
    catch(err){
     console.log("error occur ",err)
    }

}

module.exports={landingPage}