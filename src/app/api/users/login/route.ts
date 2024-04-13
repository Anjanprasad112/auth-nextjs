import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 400 }
      );
    }
    const validpassword = await bcryptjs.compare(password, user.password);
    if (!validpassword) {
      return NextResponse.json({ error: "invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData , process.env.SECRET_TOKEN! , {expiresIn : "1d"})

    const response = NextResponse.json({message : "login successful", success: true})

    response.cookies.set("token" , token , {
        httpOnly: true
    })

    return response;

  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
