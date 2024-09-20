import DoctorModel from "@/app/model/Doctor";
import dbConnect from "@/lib/dbConnect";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request,context:{params : any}) {
   try {
    const id = context.params.doctor
     if(!id || !Types.ObjectId.isValid(id)) {
         return Response.json({
             success: false,
             message:'Invalid Id or missing Id'
         },{status: 402})    
     }


     await dbConnect()
     const doctor = await DoctorModel.findById(id)
     console.log(doctor)
     if(!doctor) {
         return new NextResponse(JSON.stringify({
            success:false,
            message: "Not Found",
         }), { status:404})
     }
 
     return new NextResponse(JSON.stringify({
        success:true,
        message: "Doctor found successfully",
        doctor
     }), { status:200})
     
     
   } catch (error) {
        console.log( 'Error while fatching doctor', error )
        return Response.json({
            success: false,
            message:'Error while fatching doctor'
        },{status: 500})  
   }
}