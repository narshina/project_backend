import express, { application } from 'express'
import Staff from '../Models/services.js'
import services from '../Models/services.js'
import { log } from 'console'
import fields from '../Models/fielda.js'
import mongoose from 'mongoose'
import User from '../Models/user.js'
import { upload } from '../multer.js'

const router=express()

router.post('/addservice',async(req,res)=>{
    try{
        console.log(req.body)
        let newservice=new Staff(req.body)
        console.log(newservice,'new staff');
        let response=await newservice.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})
router.get('/vservice',async(req,res)=>{
    let response=await services.find()
    console.log(response)
    res.json(response)
})
router.get('/vservice/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id)
    let response=await services.findById(id)
    console.log(response)
    res.json(response)
})
router.get('/vapply',async(req,res)=>{
    let id=req.params.id
    console.log(id)
    let servicedetails=await mongoose.connection.collection('application').find().toArray()
    console.log(servicedetails);
    let responseData=[]
    for(let x of servicedetails){
        let response=await services.findById(x.serviceId)
        console.log(response);
    responseData.push({
        application:x,
        service:response
    })
    }
    res.json(responseData)
})
router.get('/vapplyuser/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id)
    let servicedetails=await mongoose.connection.collection('application').find().toArray()
    console.log(servicedetails);
    let responseData=[]
    for(let x of servicedetails){
        let response=await services.findById(x.serviceId)
        console.log(response);
    responseData.push({
        application:x,
        service:response
    })
    }
    res.json(responseData)
})


router.get('/vapplyPresident',async(req,res)=>{
    let id=req.params.id
    console.log(id)
    let servicedetails=await mongoose.connection.collection('application').find({status:'accepted by staff'}).toArray()
    console.log(servicedetails);
    let responseData=[]
    for(let x of servicedetails){
        let response=await services.findById(x.serviceId)
        console.log(response);
    responseData.push({
        application:x,
        service:response
    })
    }
    res.json(responseData)
})


router.get('/applydetail/:id',async(req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id)
    console.log(id)
    let response=await mongoose.connection.collection('application').findOne({_id:id})
    let users=await User.findById(response.userId)
    let service=await services.findById(response.serviceId)
    console.log(response)
    res.json({application:response,users:users,services:service})
    
})

router.get('/vform/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await fields.find({servicesid:id})
    let responseData=[]
    for(let x of response){
        let servicedetails=await services.findById(x.servicesid)
        responseData.push({
            field:x,
            service:servicedetails
        })
    }
    console.log(response);
    res.json(responseData)
})
router.post('/addfield',async(req,res)=>{
    try{
        
      console.log(req.body);
      let newfield=new fields(req.body)
      console.log(newfield,'new field');
      let response=await newfield.save()
      res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})
router.put('/manageapplication/:id',async (req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id)
    console.log(id);
    console.log(req.body)
    let response=await mongoose.connection.collection('application').updateOne({_id:id},{$set:req.body})
    console.log(response);
})
router.put('/manageapplicationpresident/:id',upload.single('finalDocument'),async (req,res)=>{
    let id=new mongoose.Types.ObjectId(req.params.id)
    console.log(id);
    console.log(req.file);
    req.body={...req.body,finalDocument:req.file.filename}
    console.log(req.body)
    let response=await mongoose.connection.collection('application').updateOne({_id:id},{$set:req.body})
    console.log(response);
})
export default router