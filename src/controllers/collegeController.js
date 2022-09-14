const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

const getCollege = async function(req,res){

    const data = req.query
    const clgName = req.query.name
    const clgData= await collegeModel.findOne({name:clgName}).select({isDeleted:0})
    const clgId = clgData._id

    const internData = await internModel.find({collegeId:clgId}).select({collegeId:0})

    return res.status(200).send({"data":{...clgData,"interns":internData}})

        
}