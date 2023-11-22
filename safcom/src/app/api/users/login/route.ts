import bcryptjs from 'bcryptjs';
import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { connect } from "src/dbConfig/dbConfig"
import User from '@/src/models/userModel';
import jwt from 'jsonwebtoken';



connect()

export async function POST (request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        console.log(reqBody)

        //CHECK IF USER EXISTS
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exists"}, {status: 400})

        }
        console.log('user exists'); 'user exists'
        // check if password exists
        const validPassword = await bcryptjs.compare
        (password, user.password)
        if(!validPassword){
            return NextResponse.json({
                error: "Invalid Password",
                              
            }, {status: 400})

        }
        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,
            {expiresIn: "1d"})
        
        const response = NextResponse.json({
            message:'LOGIN SUCCESSFUL',
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
        })
        return response;

    } catch(error: any){
        return NextResponse.json({error: error.message},
        {status: 500})

    }
}