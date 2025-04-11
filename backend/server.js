import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/dbConnection.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes  from "./routes/doctorRoutes.js";
import otpRoutes from "./routes/otpRoutes.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);
app.use("/otp", otpRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    connectDb();
});