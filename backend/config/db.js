import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://anubhavsinghal728:anubhav728@cluster0.sjmdo.mongodb.net/').then(()=>{
       console.log('DB connected') ;
    })
}
