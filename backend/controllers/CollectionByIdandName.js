
const collectionByIdandName = async (collectionName,id) => {

    const user = await collectionName.find({ _id: id })
    return user
}

module.exports = { collectionByIdandName }