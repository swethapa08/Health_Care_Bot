import dotenv from 'dotenv';
import asyncHandler from "express-async-handler";
import axios from 'axios';

dotenv.config();

// @desc send OTP to mail for verification
// @route POST /predict
// @access publicx  
const diseasePrediction = asyncHandler(async (req, res) => {
    const { cp, trestbps, chol, thalach, exang } = req.body;
    const heartDiseaseData = {
        age: req.user.age,
        sex: (req.user.gender == "m" ? 1 : 0),
        cp,
        trestbps,
        chol,
        thalach,
        exang,
        fbs: 0,
        restecg: 1,
        oldpeak: 1.8,
        slope: 2,
        ca: 0,
        thal: 2,
    }
    console.log(heartDiseaseData)
    console.log(`${process.env.MODEL_DOMAIN}/predict`);

    const { data } = await axios.post(`${process.env.MODEL_DOMAIN}/predict`, heartDiseaseData);

    res.status(200).json({
        message: "Prediction sent successfully",
        data: data,
    });
});

export { diseasePrediction }