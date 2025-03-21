import express from 'express'
import User from '../Models/user.js'
import complaint from '../Models/complaint.js'
import meeting from '../Models/meeting.js'
import { upload } from '../multer.js'
import Notification from '../Models/notification.js'
import fields from '../Models/fielda.js'
import mongoose from 'mongoose'
import News from '../Models/news.js'
import nodemailer from 'nodemailer'


let router=express()



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'narshina2001@gmail.com',
    pass: 'ahrv itmb egdz fwjv',
  },
});

router.post('/sendOTP', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const mailOptions = {
    from: 'narshina2001@gmail.com',
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'OTP sent successfully',otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send({ error: 'Failed to send OTP' });
  }
});



router.post('/register', upload.fields([{ name: 'photo' }, { name: "idproof" }, { name: 'pancard' }]), async (req, res) => {
    try {
        if(req.files){

        if (req.files['photo']) {
            const imagePath = req.files['photo'][0].filename;
            req.body = { ...req.body, photo: imagePath };
        }
        if (req.files['idproof']) {
            const idproof = req.files['idproof'][0].filename;
            req.body = { ...req.body, idproof: idproof };
        }
        if (req.files['pancard']) {
            const pancards = req.files['pancard'][0].filename;
            req.body = { ...req.body, pancard: pancards };
        }
    }

        // Check if a secretary already exists
        if (req.body.usertype === 'secretary') {
            const existingSecretary = await User.findOne({ usertype: 'secretary' });
            if (existingSecretary) {
                return res.status(400).json({message:'Secretary already added'});
            }
        }
        if (req.body.usertype === 'member') {
            // Check if a ward member already exists for the given ward
            const existingWardMember = await User.findOne({ usertype: 'member', wardNumber: req.body.wardNumber });
            if (existingWardMember) {
                return res.status(400).json({message:'Ward member already added for this ward'});
            }
        }
        const existingmail = await User.findOne({ email:req.body.email });

        if(existingmail){
            return res.status(400).json({message:'mail already exist'});

        }
        const existphonenumber = await User.findOne({ phoneNumber: req.body.phoneNumber });
        if (existphonenumber) {
            return res.status(400).json({ message:'phone number exists' });
        }

        let newUser = new User(req.body);
        let response = await newUser.save();
        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    }
});


router.post('/login',async (req,res)=>{
    console.log(req.body);
    const {email,password}=req.body
    let user=await User.findOne({email:email,password:password})
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
router.put('/editprofile/:id',upload.fields([{name:'photo'},{name:"idproof"},{name:'pancard'}]),async(req,res)=>{
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
        if(req.files['pancard']){
            
            const pancards = req.files['pancard'][0].filename;
            req.body={...req.body,pancard:pancards}
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
    let meetings=await meeting.find({userid:member?._id})
    console.log(meetings,'==============a=s=a');
    console.log(response);
    console.log(member);
    res.json(meetings)
})
router.get('/viewnotuser/:id',async(req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id)
    console.log(id);
    let response=await User.findById(id)
    console.log(response,'===========================');
    let member=await User.findOne({wardNumber:response.wardNumber,usertype:'member'})
    let meetings=await Notification.find({userid:member?._id})
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
    console.log(response);
    let responseData=[]
    for (let x of response){
        if(!x.reply){
        let userdetails=await User.findById(x.userid)
        responseData.push({
            complaint:x,
            user:userdetails
        })
    }
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
router.delete('/deletemeeting/:id',async(req,res)=>{
    let id=req.params.id
    let response=await meeting.findByIdAndDelete(id)
})
router.delete('/deletenot/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Notification.findByIdAndDelete(id)
})
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let response = await User.findByIdAndDelete(id);
        res.json(response)
    } catch (error) {
        res.json(error.message)
    }
});
router.post('/loginaccess',async (req,res)=>{
    let response=await  User.findOne(req.body)
    console.log(response);
    res.json(response)
})


export default router