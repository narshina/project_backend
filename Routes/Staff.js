import express from 'express'
import Staff from '../Models/services.js'
import services from '../Models/services.js'
import { log } from 'console'
import fields from '../Models/fielda.js'
import mongoose from 'mongoose'

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
router.get('/applydetail/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id)
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
export default router