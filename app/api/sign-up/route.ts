import dbConnct from "@/lib/dbConnect";
import UserModel from "@/app/model/User";
import bcrypt from 'bcryptjs'
import { sendVerification } from "@/helper/sendVerifcationEmail";
import { NextResponse } from "next/server";

export async function POST( request:Request ) {
   await dbConnct()
   try {
      const { username, email, password,identity } = await request.json();
      let id:any;
      // Check if user already exists in database  
      const user = await UserModel.findOne({
         email,
      })

      const verifyCode = Math.floor(100000 + Math.random() * 90000).toString()

         if(user) {
           if(user.isVerified) {
            return new NextResponse(JSON.stringify({
               message:'User with this email already verified!',
               success:false,
            }), {status:400});
           }
           else {
            const hashedPassword = await bcrypt.hash(password,10)
            user.password = hashedPassword;
            user.verifyCode = verifyCode
            user.verifyCodeExpiry = new Date(Date.now() + 3600000);

            const emailResponse = await sendVerification(
               email, username, verifyCode
            )
            if(!emailResponse.success) {
               return new NextResponse(JSON.stringify({
                  message:emailResponse.message,
                  success:false,
               }), {status:500})
            }

            await user.save()


            return new NextResponse(JSON.stringify({
               message:'Please verify your email!',
               success:true,
               user
            }), {status:200})
           }
         }else {
            
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            console.log(expiryDate);

            const user = new UserModel({
               username,
               email,
               password:hashedPassword, 
               verifyCode,
               identity,
               verifyCodeExpiry:expiryDate,
               isVerified:false,
            })
            const emailResponse = await sendVerification(
               email, username, verifyCode
            )
            if(!emailResponse.success) {
               return new NextResponse(JSON.stringify({
                  message:emailResponse.message,
                  success:false,
               }), {status:500})
            }

            await user.save()

            return new NextResponse(JSON.stringify({
               message:'Please verify your email!',
               success:true,
               user
            }), {status:200})}    
 
      } catch (error) {
         console.error('Error registering user', error)

         return new NextResponse(JSON.stringify({
            message:'Error while signUp',
         }), {status:500})
      }   
}