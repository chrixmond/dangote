const mongoose = require(`mongoose`)

const staffSchema = new mongoose.Schema({
    fullName:{type:String},
    age:{type:Number},
    maritalStatus:{type:String},
    address:{type:String},
    gender:{type:String},
    academicQualification:{type:String},
    stateOfOrigin:{type:String},
    signInTime:{type:String},
    signOutTime:{type:String}
},{timestamps:true})

const staffModel = mongoose.model(`Dangote Sugar`, staffSchema)

module.exports = staffModel