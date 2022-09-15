// POST /functionup/interns
// Create a document for an intern.
// Also save the collegeId along with the document. Your request body contains the following fields -/
// { name, mobile, email, collegeName}
// Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like this
// Return HTTP status 400 for an invalid request with a response body like this

const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const checkName = /^[a-z\s]+$/i


const isValid = (detail)=>{
    if(!typeof detail ==="string"||detail.trim().length ==0){
        return false
    }return true
}


const emailValidator = function (email) {
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

const mobileValidator = (mobile) => {
    let regex = /^\d{10}$/
    return regex.test(mobile)
}

const createInternModel = async (req, res) => {
    try {
        let body = req.body
        if (Object.keys(body).length == 0) {
            return res.status(400).send({ status: false, msg: "Please Enter valid Details" })
        }
        let { name, mobile, email, collegeName } = body

        if (!name) {
            return res.status(400).send({ status: false, msg: "Please Enter name" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid Name" })
        }
        name = name.trim().toLowerCase() 
        if (!mobile) {
            res.status(400).send({ status: false, msg: "Please Enter mobile" })
        }
        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid collegeName" })
        }
        if (!mobileValidator(mobile)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid Mobile Number" })
        }
        if (mobile) {
            let check = await internModel.findOne({ mobile: mobile })
            if (check) {
                return res.status(400).send({ status: false, msg: "Mobile Number Already Exist, Please Try With Another Mobile Number" })
            }
        }


        if (!email) {
            return res.status(400).send({ status: false, msg: "Please Enter email" })
        } if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid collegeName" })
        } if (!emailValidator(email)) {
            return res.status(400).send({ status: false, msg: "Email_ID Not Valid ,Please Enter Valid Email_id" })
        } 
        email =email.trim().toLowerCase() 
        if (email) {
            let check = await internModel.findOne({ email: email })
            if (check) {
                return res.status(400).send({ status: false, msg: "Email Already Exist, Please Try With Another Email _ID" })
            }
        } 
        


        //collegeName validator if not present in body
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "Please Enter collegeName" })
        }
        //collage validator if not enter valid collegeName
        if (!isValid(collegeName)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid collegeName" })
        }
        collegeName = collegeName.trim().toLowerCase()


        let collageDetails = await collegeModel.findOne({ $or: [{ name: collegeName }, { fullName: collegeName }] })
        
        if (!collageDetails ) {
            return res.status(404).send({ status: false, msg: "Collage Name Not Found" })
        }
        if (collageDetails.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "Collage Name Not Found" })
        }
        let collegeId = collageDetails["_id"]
        body.collegeId = collegeId

        // storing data in internmodel database
        let saveData = await internModel.create(body)
        return res.status(201).send({ status: true, data: saveData })


    }

    catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}


module.exports.createInternModel = createInternModel