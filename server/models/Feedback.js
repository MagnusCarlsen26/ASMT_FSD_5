import mongoose, { mongo } from "mongoose";

const FeedbackSchema = mongoose.Schema({
    username : String,
    productName : String,
    rating : Number,
    comments : String,
})

export const FeedbackModel = mongoose.model('Feedback',FeedbackSchema)
