import express from 'express'
import User from '../Models/user.js'
import complaint from '../Models/complaint.js'
import meeting from '../Models/meeting.js'
import { upload } from '../multer.js'
import Notification from '../Models/notification.js'
import fields from '../Models/fielda.js'
import mongoose from 'mongoose'
import News from '../Models/news.js'


let router=express()


router.post('/register',upload.fields([{name:'photo'},{name:"idproof"}]), async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.files,'sdds');
        if(req.files['photo']){

            const imagePath = req.files['photo'][0].filename;
            req.body={...req.body,photo:imagePath}
        }
        if(req.files['idproof']){
            
            const idproof = req.files['idproof'][0].filename;
            req.body={...req.body,idproof:idproof}
        }
        console.log(req.body)
        let newUser=new User(req.body)
        console.log(newUser,'new user');
        let response=await newUser.save()
        res.json(response)
    }
    catch(e){
        console.log(e);
        res.json(e.message)
    }
})

router.post('/login',async (req,res)=>{
    console.log(req.body);
    let user=await User.findOne(req.body)
    console.log(user);
    res.json(user)
})
router.get('/viewprofile/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await User.findById(id)
    console.log(response)
    res.json(response)

})
router.get('/viewreply/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await complaint.find({userid:id})
    console.log(response)
    res.json(response)

})
router.put('/editprofile/:id',upload.fields([{name:'photo'},{name:"idproof"}]),async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.files,'sdds');
        if(req.files['photo']){

            const imagePath = req.files['photo'][0].filename;
            req.body={...req.body,photo:imagePath}
        }
        if(req.files['idproof']){
            
            const idproof = req.files['idproof'][0].filename;
            req.body={...req.body,idproof:idproof}
        }
       let id=req.params.id
       console.log(id);
       console.log(req.body);
    let response=await User.findByIdAndUpdate(id,req.body)
    res.json(response)
    }
    catch(e){
        console.log(e);
        res.json(e.message)
    }

})



router.post('/postcomplaint',async(req,res)=>{
    try{
        
        console.log(req.body)
        let users=await User.findById(req.body.userid)
        if(req.body.complaintTo=='wardmember'){

            let member=await User.findOne({wardNumber:users.wardNumber,usertype:'member'})
            console.log(member,'members');
            req.body={...req.body,complaintTo:member._id}
        }
        if(req.body.complaintTo=='president'){

            let president=await User.findOne({usertype:'president'})
            console.log(president,'presidenta');
            req.body={...req.body,complaintTo:president._id}
        }
        let newComplaint=new complaint(req.body)
        console.log(newComplaint,'new complaint')
        let response=await newComplaint.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})
router.get('/viewmeeting', async (req, res) => {
    try {
        let meetings = await meeting.find();
        let meetingsWithUserDetails = [];

        for (let i = 0; i < meetings.length; i++) {
            let meetingUser = await User.findById(meetings[i].userid);
            if (meetingUser) {
                meetingsWithUserDetails.push({ ...meetings[i]._doc, user: meetingUser });
            }
        }

        res.json(meetingsWithUserDetails);
        console.log(meetingsWithUserDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/viewmeetuser/:id',async(req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id)
    console.log(id);
    let response=await User.findById(id)
    console.log(response,'===========================');
    let member=await User.findOne({wardNumber:response.wardNumber,usertype:'member'})
    console.log(member._id,'---------------------------------------');
    let meetings=await meeting.find({userid:member._id})
    console.log(meetings,'==============a=s=a');
    console.log(response);
    console.log(member);
    res.json(meetings)
})

router.get('/viewnotificaion', async (req, res) => {
    try {
        let notifications = await Notification.find();
        console.log(notifications);
        let notificationsWithUserDetails = [];

        for (let i = 0; i < notifications.length; i++) {
            let notificationUser = await User.findById(notifications[i].userid);
            console.log(notificationUser);
            if (notificationUser) {
                notificationsWithUserDetails.push({ ...notifications[i]._doc, user: notificationUser });
            }
        }

        res.json(notificationsWithUserDetails);
        console.log(notificationsWithUserDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get('/viewfield/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await fields.findById(id)
    console.log(response);
    res.json(response)
})
router.get('/vcom/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    
    let response=await complaint.find({complaintTo:id})
    let responseData=[]
    for (let x of response){
        let userdetails=await User.findById(x.userid)
        responseData.push({
            complaint:x,
            user:userdetails
        })
    }
    res.json(responseData)
    
})
router.post('/submitform', upload.single('photo'), async (req, res) => {
    try {
        console.log(req.body);
        let UserId=new mongoose.Types.ObjectId(req.body.userId)
        let ServiceId=new mongoose.Types.ObjectId(req.body.serviceId)
        console.log(req.file, 'sdds');
        if (req.file) {
            const imagePath = req.file.filename;
            req.body = { ...req.body, document: imagePath };
        }
        req.body={...req.body,userId:UserId,serviceId:ServiceId,applicationDate:new Date}
        console.log(req.body);
        let response = await mongoose.connection.collection('application').insertOne(req.body)
        res.json(response);
    } catch (e) {
        console.log(e);
        res.json(e.message);
    }
});
router.get('/vnews',async(req,res)=>{
    let response=await News.find()
    console.log(response)
    res.json(response)
})
router.delete('/deletenews/:id',async(req,res)=>{
    let id=req.params.id
    let response=await News.findByIdAndDelete(id)
})

export default router