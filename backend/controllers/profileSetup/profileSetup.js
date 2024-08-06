
const { Image } = require('../../models/images')
const { profile } = require('../../models/profileSetup')

const profileSetup = async (req, res) => {
try {
    console.log('hello ')
        const newImage = await new Image({
            fileName: req.file.originalname,
            url: req.file.path,
            cloudinary_id: req.file.filename,
        })
        await newImage.save()
        res.json(newImage)
    }
    catch(err){
        console.log('errror occur ',err)
    }
}

module.exports = { profileSetup }