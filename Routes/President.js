import express from 'express'
const router=express()

router.get('/find',async(req,res)=>{
 console.log('in president find');
})
export default router