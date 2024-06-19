import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect(String(process.env.MONGODB_URI))
    console.log('MongoDB Connection Successful')
}