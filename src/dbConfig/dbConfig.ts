import mongoose from "mongoose";

export async function connect(){
    try{
         mongoose.connect(process.env.MONGO_URI!);

        const connection =  mongoose.connection;

        connection.on("Connected", () => {
            console.log("mongo db connection established");
        });
        connection.on("error", (err) => {
            console.log("mongo db connection error : "+err);
            process.exit(1);
        });


    }
    catch(err){
        console.log(err);
        console.log("some thing went wrong");
    }
}