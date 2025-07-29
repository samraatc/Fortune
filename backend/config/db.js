import mongoose from "mongoose";

mongoose.set('strictPopulate', false);

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://vivekkumar787067:vivek09876@cluster0.04yo62h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
       console.log('DB connected') ;
    })
}