import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest , NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect();

export async function GET(request: NextRequest){
    try {
        const userID = await getDataFromToken(request);
        const user =  await User.findOne({_id:userID}).select("-password");
        return NextResponse.json({data : user , message : "user found"});
        
    } catch (error : any) {
        console.log(error.message);       
        return NextResponse.json({error : error.message},{status:500}); 
    }
}
