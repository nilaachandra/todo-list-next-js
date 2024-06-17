import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nilalaishram:halamadrid1536@justanotherblog.az1mowo.mongodb.net/?retryWrites=true&w=majority&appName=JustAnotherBlog')
    console.log('MongoDB Connection Successful')
}