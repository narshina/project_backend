import express from 'express'
import User from '../Models/user.js';
import meeting from '../Models/meeting.js';
const router=express()

router.get('/vmeeting/:id',async(req,res)=>{
    let id=req.params.id
    let response=await meeting.find({userid:id})
    res.json(response)
})

export default router