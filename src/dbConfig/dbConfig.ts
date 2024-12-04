import mongoose from "mongoose";

export async function connect(){
console.log(process.env.MONGO_URL)
    try {
       mongoose.connect(process.env.MONGO_URL!);
       const connection = mongoose.connection;

        connection.on("connected", ()=>{
            console.log("Connected to MongoDB");
        })

        connection.on("error",(err)=>{
            console.log("mongoDb connection error, please make sure mongodb is running " + err);
            process.exit()
        })


    } catch (error) {
        console.log("something went wrong");
        console.log(error)
    }
}