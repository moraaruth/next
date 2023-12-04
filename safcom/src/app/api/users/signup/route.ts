import bcryptjs from 'bcryptjs';
import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { connect } from "../../../../dbConfig/dbConfig"
import User from '../../../../../src/models/userModel';

connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
<<<<<<< HEAD
        const salt = await bcryptjs.genSalt(20)
=======
        const salt = await bcryptjs.genSalt(10)
>>>>>>> 1937aea666aea428bdfed3492778b9f2e6ed695f
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);    

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}