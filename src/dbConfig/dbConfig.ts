// import mongoose from "mongoose";

// export async function connect(){
// // console.log(process.env.MONGO_URL)

//     try {
//        mongoose.connect(String(process.env.MONGO_URL!));
//        const connection = mongoose.connection;

//         connection.on("connected", ()=>{
//             console.log("Connected to MongoDB");
//         })

//         connection.on("error",(err)=>{
//             console.log("mongoDb connection error, please make sure mongodb is running " + err);
//             process.exit()
//         })


//     } catch (error) {
//         console.log("something went wrong");
//         console.log(error)
//     }
// }

import mongoose from "mongoose";


const MONGODB_URL = process.env.MONGO_URL!;

if(!MONGODB_URL){
    throw new Error("Please define the MONGODB_URL environment variable inside .env");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {connection: null, promise: null};
}


export async function connectToDatabase(){
    if(cached.connection){
        return cached.connection;
    }

    if(!cached.promise){
const opts = {
    bufferCommands: true,
    maxPoolSize: 10,

}

cached.promise = mongoose.connect(MONGODB_URL, opts)
.then(()=>mongoose.connection)

}

try {
    cached.connection = await cached.promise;
} catch (error) {
    cached.promise = null;
    throw error;
}


return cached.connection;

}