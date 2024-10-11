import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';
import saveFeedback from "./routes/saveFeedback.js"
import analysis from "./routes/analysis.js"

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())

app.use("/save",saveFeedback)
app.use("/analysis",analysis)

app.get("/helloWorld",(req,res) => {
    res.send("helloWorld")
})


const CONNECTION_URL = `mongodb+srv://sindhav1:${process.env.DB_PASSWORD}@cluster0.dfkwd.mongodb.net`

mongoose.connect(CONNECTION_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message)
})
 
const PORT = process.env.PORT || 5000

app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`)
})