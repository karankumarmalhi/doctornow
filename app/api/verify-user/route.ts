import UserModel from "@/app/model/User";
import dbConnect from "@/lib/dbConnect";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    await dbConnect()
    try {
        const { code } = await request.json()

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        console.log(id)


        if(!id){
            return new NextResponse(JSON.stringify({
                message:'User ID is required',
                success:false,
            }), {status:400})
        }

        if(!Types.ObjectId.isValid(id)) {
            return new NextResponse(JSON.stringify({
                message:'Invalid ID',
                success:false,
            }), {status:400})
        }

        if(!code) {
            return new NextResponse(JSON.stringify({
                message:'Verify Code required',
                success:false,
            }), {status:400})
        }

        const user = await UserModel.findById(id)

        if(!user) {
            return new NextResponse(JSON.stringify({
                message:'User not found',
                success:false,
            }), {status:404})
        }

        const Otp = user.verifyCode === code
        const isVerfyCodeExpire = new Date( user.verifyCodeExpiry) > new Date()
        
        if(!Otp) {
            return new NextResponse(JSON.stringify({
                message:'Verify code is inccorrect, Please enter correct code',
                success:false,
            }), {status:403})
        }else if(!isVerfyCodeExpire) {
            return new NextResponse(JSON.stringify({
                message:"Verification code is expired, please signup again to get new code",
                success:false,
            }), {status:403})
          
        }


       user.isVerified = true,
       await user.save()
 
        return new NextResponse(JSON.stringify({
            message:'User Verified Successfully',
            success:true,
            user
        }), {status:200})
    

    } catch (error) {
        console.log("Error while verifying user", error)
        return new NextResponse(JSON.stringify({
            message:'Error while Verifying Code',
            success:false,
        }), {status:500})   
    }
}