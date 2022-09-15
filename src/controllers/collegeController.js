const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')


const getCollege = async function(req,res){

    const clgName = req.query.name
    if(!clgName)
        return res.status(400).send({status:false,message:"CollegeName not given"})

    const clgData= await collegeModel.findOne({name:clgName,isDeleted:false})
    if(!clgData)
        return res.status(404).send({status:false,message:"CollegeName not valid"})
    
    
    const clgId = clgData._id
    
    const internData = await internModel.find({collegeId:clgId,isDeleted:false}).select({collegeId:0,isDeleted:0,__v:0})
    if(internData.length==0)
        return res.status(404).send({status:false,message:"No intern found for this college"})
    const result = {
        name:clgData.name,
        fullName:clgData.fullName,
        logoLink:clgData.logoLink,
        interns:internData,
    }
    return res.status(200).send({"data":result})

        
}

const checkName = /^[a-z\s]+$/i
const logoValidation = function (logo) {
    let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm

    return regex.test(logo)
    // return logo.match(regex)

}

const college = async function (req, res) {
    try {
        let Data = req.body;
        let { name, fullName, logoLink } = Data
        if (!name) return res.status(400).send({ status: false, msg: " please use name " })
        if (!checkName.test(name)) return res.status(400).send({ status: false, msg: "please Valid user name" })

        let checkName1 = await collegeModel.findOne({ name: name })
        if (checkName1) return res.status(400).send({ status: false, msg: "name already exist" })


        if (!fullName) return res.status(400).send({ status: false, msg: " please use fullName " })
        if (!checkName.test(fullName)) return res.status(400).send({ status: false, msg: "please Valid user fullName" })

        if (!logoLink) return res.status(400).send({ status: false, msg: " please use logoLink " })
        if (!logoValidation(logoLink)) {
            return res.status(400).send({ status: false, msg: "Please enter valid logoLink" })
        }
        let saveData = await collegeModel.create(Data);
        res.status(201).send({ status: true, msg: saveData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.college = college;
module.exports.getCollege = getCollege

