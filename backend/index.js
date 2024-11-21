import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authroute from './routes/authroutes.js'
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
    console.log("hmlo hmlo from db")
})
const app = express();

app.use(cors({ origin: 'http://localhost:5173/', credentials: true }));

const __dirname = path.resolve();

app.use(cookieParser())
app.listen(3000, () => {
    console.log("pollsss aa gyi pollsss")
})
app.use(express.json())

app.use('/backend/auth', authroute);


app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statuscode).json({
        success: false,
        message,
        statuscode
    });
})

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})