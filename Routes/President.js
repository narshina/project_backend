import express from 'express'
import Notification from '../Models/notification.js';
import Meeting from '../Models/meeting.js';
import News from '../Models/news.js';

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
export default router