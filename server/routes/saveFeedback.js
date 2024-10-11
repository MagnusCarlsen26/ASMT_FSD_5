import express  from "express";
import { FeedbackModel } from '../models/Feedback.js'

const router = express.Router()

router.post("/saveFeedback",async(req,res) => {

    try {
        const { username, productName, rating, comments } = req.body

        const newUser = new FeedbackModel({
            username,
            productName,
            rating,
            comments,
            cat : Date.now()
        })
        await newUser.save()

        res.status(200).send({
            isError : false,
            data : {
                success : true,
                message : "Feedback saved successfully !!."
            }

        })
    } catch(error) {
        console.error("Error in /saveFeedback")
        console.error(error)
        res.status(500).send({
            isError : true,
            data : {
                success : false,
                message : "Internal server Error."
            }
        })
    }
} )

router.post("/getHistory",async(req,res) => {
    try {
        const { username } = req.body
        const feedbacks = await FeedbackModel.find({ username })
        res.status(200).send({
            isError : false,
            data : {
                success : true,
                history : feedbacks
            }
        })
    } catch (error) {
        console.error(error)
        console.error(error)
        res.status(500).send({
            isError : true,
            data : {
                success : false,
                message : "Internal server error"
            }
        })
    }
})

export default router