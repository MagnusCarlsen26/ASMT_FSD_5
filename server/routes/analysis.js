import express  from "express"
import { FeedbackModel } from '../models/Feedback.js'

const router = express.Router()

router.post("/feedbackByProduct",async(req,res) => {
    try {
        const { productName } = req.body

        const feedbacks = await FeedbackModel.find({ productName })
        
        res.status(200).send({
            isError : false,
            data : {
                success : true,
                feedbacks
            }
        })
    } catch (error) {
        console.error("Error in /analysis/feedbackByProduct")
        console.error(error)
        res.status(500).send({
            isError : true,
            data : {
                success : false,
                message : "Internal server Error."
            }
        })
    }
})

router.post("/averageRatingByProduct",async(req,res) => {
    try {

        const { productName } = req.body

        const feedbacks = await FeedbackModel.find({ productName })

        let averageRating
        if (feedbacks.length) {
            console.log(feedbacks.length)
            averageRating = feedbacks.reduce( (acc,feedback) => acc + feedback.rating, 0)/feedbacks.length
            feedbacks.forEach( feedback => {console.log(feedback.rating)} )
        } else{
            averageRating = "No reviews yet."
        }

        res.status(200).send({
            isError : false,
            data : {
                success : true,
                averageRating
            }
        })

    } catch (error) {
        console.error("Error in /analysis/averageRatingByProduct")
        console.error(error)
        res.status(500).send({
            isError : true,
            data : {
                success : false,
                message : "Internal server Error."
            }
        })
    }
})

export default router