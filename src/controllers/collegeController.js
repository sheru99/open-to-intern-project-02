const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const checkName = /^[a-z\s ,]+$/i

const logoValidation = function (logo) {
    let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm

    return regex.test(logo)
}
const isValid = (data) => {
    if (!typeof data === "string" || data.trim().length == 0||typeof data === "Number") {
        return false
    } return true
}

//=============================================CreateCollege=================================================

const college = async function (req, res) {
try {
    let Data = req.body;
    if (Object.keys(Data).length == 0) {
        return res.status(400).send({ status: false, message: "Please Enter  Details" })
    }
    let { name, fullName, logoLink } = Data


    if (!name) return res.status(400).send({ status: false, message: " Please Enter Name " })
    if (!isValid(name)) {
        return res.status(400).send({ status: false, message: "Please Enter Valid Name" })
    }
    if (!checkName.test(name)) return res.status(400).send({ status: false, message: "Please Enter Valid User Name" })
    name = name.toLowerCase()
    let checkName1 = await collegeModel.findOne({ name: name })
    if (checkName1) return res.status(400).send({ status: false, message: "Name Already Exist,Please Try With Another Valid Name" })


    if (!fullName) return res.status(400).send({ status: false, message: " Please Enter FullName " })
    if (!isValid(fullName)) {
        return res.status(400).send({ status: false, message: "Please Enter Valid FullName" })
    }
    if (!checkName.test(fullName)) return res.status(400).send({ status: false, message: "Please Enter Valid user fullName" })
    fullName = fullName.toLowerCase()


    if (!logoLink) return res.status(400).send({ status: false, message: " Please Enter LogoLink " })

    if (!logoValidation(logoLink)) {
        return res.status(400).send({ status: false, message: "Please Enter Valid LogoLink" })
    }
    let obj ={name,fullName,logoLink}
    let saveData = await collegeModel.create(obj);
    res.status(201).send({ status: true, message:"",data: saveData })
}
catch (err) {
    return res.status(500).send({ status: false, message: err.message });
}
}

//==========================================GetCollege================================================


const getCollege = async function (req, res) {

try {

    const clgName = req.query.collegeName
    const query = req.query
    const comp = ["collegeName"]
    if (!Object.keys(query).every(elem => comp.includes(elem)))
      return res.status(400).send({ status: false, msg: "wrong query parameters" });

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
    return res.status(200).send({ "status":true,"data": result })
}
catch (err) {
    return res.status(500).send({ status: false, message: err.message });
}


}

module.exports.college = college;
module.exports.getCollege = getCollege
