import bcryptjs from 'bcryptjs';
import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { connect } from "@/src/dbConfig/dbConfig"
import User from '@/src/models/userModel';

connect()

export async function POST (request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody)

        //CHECK IF USER EXISTS
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})

        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash
        (password, salt)

        const newUser = new User ({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch(error: any){
        return NextResponse.json({error: error.message},
        {status: 500})

    }
}