const router=require('express').Router()
const Complaint=require('../models/complaintmodel')
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const {v4:uuidv4}=require('uuid')
router.get('/',async(req,res)=>{
    res.status(200).json({"message":"working fine"})
})
router.post('/addUser',async(req,res)=>{
    let u=new User()
    let uid=uuidv4()
    try{
    u.uuid=uid;
    u.complaints=[];
    await u.save();
    res.status(201).json({"user_id":uid});
    }catch(e){
        console.log(e)
        res.status(400).json({"message":"error"})
    }
})
router.post('/addComplaint',async(req,res)=>{
    const {uuid,complaint,complaint_proof,issue_category}=req.body;
    try{
    let mycomplaint=Complaint()
    let user=await User.findOne({uuid})
    let non_hashed_complaint_id=uuid+uuidv4()
    const saltrounds=10;
    //first generate salt
    let salt=await bcrypt.genSalt(saltrounds);
    let complaint_id=await bcrypt.hash(non_hashed_complaint_id,salt);
    user.previous_complaints.push(non_hashed_complaint_id);
    await user.save();
   // mycomplaint.uuid=uuid;
    mycomplaint.complaint=complaint;
    mycomplaint.complaint_proof=complaint_proof;
    mycomplaint.issue_category=issue_category;
    mycomplaint.complaint_id=complaint_id;
    await mycomplaint.save();
    res.status(201).json({"message":non_hashed_complaint_id})
    }catch(e){
        console.log(e);
        res.status(400).json({"message":"something went wrong"})
    }
})
router.get('/getMyComplaints',async(req,res)=>{
    const {uuid}=req.body;
    let user=await User.findOne({uuid})
    let complaints=user.previous_complaints;
    let newlist=[]
    let complaint=await Complaint.find({});
    console.log(complaint,complaints);
    for(let i =0;i<complaints.length;i++){
        for(let j=0;j<complaint.length;j++){
            let result=await bcrypt.compare(complaints[i],complaint[j].complaint_id);
            if(result){
                newlist.push(complaints[j]);
            }
        }
    }
    res.status(201).json({"the complaint list of a user":newlist})
})

module.exports=router;