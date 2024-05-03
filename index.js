import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/PANCHAYAT')
    .then(() => console.log('Connected'));
app.use('/uploads', express.static('uploads'));
import { dirname, join, } from 'node:path';
import { fileURLToPath, } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = join(__dirname, 'uploads', filename);

    // Set headers to force download
    res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
    res.sendFile(filePath);
});

import presidntRouter from './Routes/President.js'
import secretaryRouter from './Routes/Secretary.js'
import staffRouter from './Routes/Staff.js'
import memberRouter from './Routes/Member.js'
import userRouter from './Routes/User.js'
import User from './Models/user.js';
app.use(cors())
app.use(express.json())
app.use('/President', presidntRouter)
app.use('/Secretary', secretaryRouter)
app.use('/Staff', staffRouter)
app.use('/Member', memberRouter)
app.use('/User', userRouter)



app.post('/forgot-password/:email', async (req, res) => {

    try {
        let email=req.params.email
        const { password } = req.body;

        if (!email) return res.status(400).json({ message: 'Email is not required' })
        if (!password) return res.status(400).json({ message: 'Password is required' })

        const isMatchMail = await User.findOne({ email: email })

        if (!isMatchMail) return res.status(400).json({ message: 'User not exist' })

        await User.findByIdAndUpdate(isMatchMail._id, { $set: { password: req.body.password } })

        return res.status(201).json({message:'Updated password'})
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({message:e.message})

    }
})


app.listen(4000)