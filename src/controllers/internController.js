// POST /functionup/interns
// Create a document for an intern.
// Also save the collegeId along with the document. Your request body contains the following fields -/
// { name, mobile, email, collegeName}
// Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like this
// Return HTTP status 400 for an invalid request with a response body like this
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const createInterModel = async (req, res) => {
    try {
    let body = req.body
    const { name, mobile, email, collegeName } = body



    if(!name){
        res.status(400).send({status:false,msg:"Please Enter name"})
    }if(name){
        let check = await internModel.findOne()
    }

    //collegeName validator if not present in body
    if (!collegeName) {
        return res.status(400).send({ status: false, msg: "Please Enter collageName" })
    }
    //collage validator if not enter valid collageName
    if (collegeName) {
        if (!typeof collegeName === "string" || collegeName.trim().length == 0) {
            return res.status(400).send({ status: false, msg: "Please Enter valid collegeName" })
        }
    }




    let collegeDetails = await collegeModel.findOne({ $or: [{ name: collegeName }, { fullName: collageModel }] })
    if (collegeDetails.length == 0) {
        return  res.status(404).send({ status: false, msg: "Collage Name Not Found" })
    }
    if (collegeDetails.isDeleted == true) {
        return   res.status(404).send({ status: false, msg: "Collage Name Not Found" })
    }
    let collegeId = collegeDetails._id

    // create another object to store data in database
    let obj = { name, mobile, email, collegeId }
    // storing data in internmodel database
    let saveData = await internModel.create(obj)
    return res.status(200).send({ status: true, data: saveData })

    }

    catch (err) {
      return  res.status(500).send({ status: false, Error: err.message })
    }
}


module.exports.createInterModel = createInterModel