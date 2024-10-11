import mongoose, { mongo } from "mongoose";

const UserSchema = mongoose.Schema({
    userName : String,
})

export const UserModel = mongoose.model('User',UserSchema)
