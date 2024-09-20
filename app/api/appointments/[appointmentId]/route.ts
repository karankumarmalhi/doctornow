import AppointmentModel from "@/app/model/Appointment";
import dbConnct from "@/lib/dbConnect";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

//GET Appointment by ID
export async function GET( request:Request, {params}:{params:any}) {

    await dbConnct()
        try {
            const appoitmentId = params.id
            if(!appoitmentId) {
                return new NextResponse(JSON.stringify({
                    message:'Appointment Id is required',
                    success:false
                }), {status:400})
            }

            if(!Types.ObjectId.isValid(appoitmentId)) {
                return new NextResponse(JSON.stringify({
                    message:'Invalid ID',
                    success:false
                }), {status:400})
            }

           const appointment = await AppointmentModel.findById(appoitmentId)

           if(!appointment) {
            return new NextResponse(JSON.stringify({
                message:'Not Found',
                success:false
            }), {status:404})
           }

            return new NextResponse(JSON.stringify({
                message:'Appointment found Successfully',
                success:true,
                appointment
            }), {status:200})


        } catch (error) {
            console.log('Error while fatching appointment ', error)

            return new NextResponse(JSON.stringify({
                message:'Error while fatching appointment',
                success:false
            }), {status:500})
        }
}