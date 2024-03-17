import express from 'express'
import Staff from '../Models/services.js'

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

export default router