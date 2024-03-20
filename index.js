import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const app=express()
mongoose.connect('mongodb://127.0.0.1:27017/PANCHAYAT')
.then(()=>console.log('Connected'));
app.use('/uploads', express.static('uploads'));


import presidntRouter from './Routes/President.js'
import secretaryRouter from './Routes/Secretary.js'
import staffRouter from './Routes/Staff.js'
import memberRouter from './Routes/Member.js'
import userRouter from './Routes/User.js'
app.use(cors())
app.use(express.json())
app.use('/President',presidntRouter)
app.use('/Secretary',secretaryRouter)
app.use('/Staff',staffRouter)
app.use('/Member',memberRouter)
app.use('/User',userRouter)


app.listen(4000)