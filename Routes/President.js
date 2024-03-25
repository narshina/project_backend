import express from 'express'
import Notification from '../Models/notification.js';
import Meeting from '../Models/meeting.js';
import News from '../Models/news.js';
import ward from '../Models/ward.js';
import User from '../Models/user.js';
import { upload } from '../multer.js'
import category from '../Models/category.js';
import { json } from 'stream/consumers';

const router=express()


router.post('/addnotification',async(req,res)=>{
    try{
        console.log(req.body)
        let newNotification=new Notification(req.body)
        console.log(newNotification,'new Notification');
        let response=await newNotification.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})
router.post('/addcategory',async(req,res)=>{
    try{
        console.log(req.body)
        let newcategory=new category(req.body)
        console.log(newcategory,'new category');
        let response=await newcategory.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.post('/addmeeting',async(req,res)=>{
    try{
        console.log(req.body)
        let newMeeting=new Meeting(req.body)
        console.log(newMeeting,'new Meeting');
        let response=await newMeeting.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})
router.post('/addnews',async(req,res)=>{
    try{
        console.log(req.body)
        let newnews=new News(req.body)
        console.log(newnews,'new News');
        let response=await newnews.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})
router.post('/addward',async(req,res)=>{
    try{
        console.log(req.body)
        let newward=new ward(req.body)
        console.log(newward,'new ward');
        let response=await newward.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})
router.get('/viewward',async(req,res)=>{

   let response=await ward.find()
   console.log(response)
   res.json(response)
})
router.get('/vcategory',async(req,res)=>{
    let response=await category.find()
    console.log(response)
    res.json(response)
})
router.get('/viewsecs',async(req,res)=>{
    let response=await User.findOne({usertype:'secretary'})
    console.log(response)
    res.json(response)
})
router.put('/editsecretary',async(req,res)=>{
    console.log(req.body)
    let response=await User.find({usertype:'secretary'})
    console.log(response)
})
router.get('/vmember',async(req,res)=>{
    let response=await User.find({usertype:'member'})
    console.log(response)
    res.json(response)
})
router.get('/vstaff',async(req,res)=>{
    let response=await User.find({usertype:'staff'})
    console.log(response);
    res.json(response)
})
router.get('/vuser',async(req,res)=>{
    let response=await User.find({usertype:'user'})
    console.log(response)
    res.json(response)
})

router.get('/vnotification',async(req,res)=>{
    let response=await Notification.find()
    console.log(response)
    res.json(response)
})
router.get('/vmeet',async(req,res)=>{
    let response=await Meeting.find()
    console.log(response)
    res.json(response)
})
router.put('/manageUser/:id',async (req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await User.findByIdAndUpdate(id,req.body)
})
export default router