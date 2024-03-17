import express from 'express'
import President from '../Models/notification.js';
const router=express()

router.post('/addnotification',async(req,res)=>{
    try{
        console.log(req.body)
        let newNotification=new President(req.body)
        console.log(newNotification,'new President');
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
        let newMeeting=new President(req.body)
        console.log(newMeeting,'new President');
        let response=await newMeeting.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})
export default router