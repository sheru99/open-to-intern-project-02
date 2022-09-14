const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

const getCollege = async function(req,res){

    const data = req.query
    const clgName = req.query.name
    if(!data || !clgName)
        return res.status(400).send({status:false,message:"CollegeName not given"})

    const clgData= await collegeModel.findOne({name:clgName,isDeleted:false}).select({isDeleted:0,__v:0})
    if(!clgData)
        return res.status(404).send({status:false,message:"CollegeName not valid"})
    
    
    const clgId = clgData._id
    const doc = clgData._doc
    const internData = await internModel.find({collegeId:clgId,isDeleted:false}).select({collegeId:0,isDeleted:0,__v:0})
    if(internData.length==0)
        return res.status(404).send({status:false,message:"No intern found for this college"})

    return res.status(200).send({"data":{...doc,"interns":internData}})

        
}

module.exports.getCollege = getCollege
