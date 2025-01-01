import express, { Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import contactsRoutes from './routes/ContactRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

app.use("/uploads/profiles",express.static("uploads/profiles"))
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

// console.log("cpu length", os.cpus().length);



const sever = app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
    res.send('Hello World my world earth');
});


mongoose.connect(databaseURL).then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.log(error.message);
});


