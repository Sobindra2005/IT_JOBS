const { Image } = require('../../models/images');
const { profile } = require('../../models/profileSetup');
const { User } = require('../../models/register')


const profileSetup = async (req, res) => {
  try {
    //parsing the string data into javascript object 
    const formdata = JSON.parse(req.body.formData)
    const link = JSON.parse(req.body.link)
    console.log(formdata, link)
    console.log(req.user)
    //setting the first time to false 
    await User.updateOne({ _id: req.user._id },
      { $set: { firsttime: false } },
      { upsert: true })
    const user = await User.find({_id: req.user._id})
    console.log(user)
    //stroing the image details in the database 
    const newImage = await new Image({
      filename: req.file.originalname,
      url: req.file.path,
      cloudinary_id: req.file.filename,
    })
    await newImage.save()

    console.log(newImage)

    //fetching the profile data in the database
    const newprofilesetup = await new profile({
      userId: req.user._id,
      profilePic: newImage._id,
      fullName: formdata.fullName,
      dob: formdata.dateOfBirth,
      gender: formdata.gender,
      address: formdata.address,
      city: formdata.city,
      state: formdata.state,
      postalCode: formdata.postalCode,
      PhoneNumber: formdata.phoneNumber,
      altPhoneNumber: formdata.alternatePhoneNumber ? formdata.alternatePhoneNumber : '',
      email: formdata.emailAddress,
      Nationality: formdata.nationality,
      languages: formdata.languagesSpoken,
      protofolio: link.protofolio,
      github: link.github,
      instagram: link.instagram,
      twitter: link.twitter,
      facebook: link.facebook,
      linkedln: link.linkedln,
      Bio:formdata.Bio
    })

await newprofilesetup.save()
console.log(newprofilesetup)
    res.status(200).json({ success: true, message: 'Profile setup successful' });
  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

module.exports = { profileSetup };
