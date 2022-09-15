const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
// const collegeModel = require("../models/collegeModel");
const checkName = /^[a-z\s]+$/i
const logoValidation = function (logo) {
    let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm

    return regex.test(logo)
    // return logo.match(regex)

}


const isValid = (data) => {
    if (!typeof data === "string" || data.trim().length == 0) {
        return false
    } return true
}

//=============================================CreateCollege=================================================

const college = async function (req, res) {
    try {
        let Data = req.body;
        if (Object.keys(Data).length == 0) {
            return res.status(400).send({ status: false, msg: "Please Enter  Details" })
        }
        let { name, fullName, logoLink } = Data


        if (!name) return res.status(400).send({ status: false, msg: " Please Enter Name " })
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid Name" })
        }
        if (!checkName.test(name)) return res.status(400).send({ status: false, msg: "please Valid user name" })
        name = name.toLowerCase()
        let checkName1 = await collegeModel.findOne({ name: name })
        if (checkName1) return res.status(400).send({ status: false, msg: "Name Already Exist,Please Try With Another Valid Name" })


        if (!fullName) return res.status(400).send({ status: false, msg: " Please Enter FullName " })
        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid FullName" })
        }
        if (!checkName.test(fullName)) return res.status(400).send({ status: false, msg: "Please Enter Valid user fullName" })
        fullName = fullName.toLowerCase()


        if (!logoLink) return res.status(400).send({ status: false, msg: " Please Enter LogoLink " })

        if (!logoValidation(logoLink)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid LogoLink" })
        }
        let saveData = await collegeModel.create(Data);
        res.status(201).send({ status: true, msg: saveData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

//==========================================GetCollege================================================


const getCollege = async function (req, res) {

    try {

        const clgName = req.query.name

        if (!clgName)
            return res.status(400).send({ status: false, message: "Please Enter CollegeName" })

        const clgData = await collegeModel.findOne({ name: clgName, isDeleted: false })
        if (!clgData)
            return res.status(404).send({ status: false, message: "Please Enter Valid College Name" })


        const clgId = clgData._id

        const internData = await internModel.find({ collegeId: clgId, isDeleted: false }).select({ collegeId: 0, isDeleted: 0, __v: 0 })
        if (internData.length == 0)
            return res.status(404).send({ status: false, message: "No Internship Found For This College" })
        const result = {
            name: clgData.name,
            fullName: clgData.fullName,
            logoLink: clgData.logoLink,
            interns: internData,
        }
        return res.status(200).send({ "data": result })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }


}

module.exports.college = college;
module.exports.getCollege = getCollege
