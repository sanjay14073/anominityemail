const mongoose=require('mongoose')
const ComplaintSchema=mongoose.Schema({
// "uuid":{
//     type:String,
//     required:true,
// },
"complaint":{
    type:String,
    required:true,
},
"complaint_proof":{
    type:String,
},
"issue_category":{
    type:String,
    required:true,
},
"complaint_id":{
    type:String,
    required:true,
    unique:true
}
})
const Complaint=mongoose.model("Complaint",ComplaintSchema);
module.exports=Complaint;