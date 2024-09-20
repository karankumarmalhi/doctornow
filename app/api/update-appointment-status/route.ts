import AppointmentModel from "@/app/model/Appointment"
import dbConnect from "@/lib/dbConnect"
import { Types } from "mongoose"
import { NextResponse } from "next/server"


export async function GET( request:Request ) {
    // find and update the status 
    try {
        const { searchParams } = new URL(request.url)
        const appointmentID = searchParams.get('appointmentId')

        if(!appointmentID) {
            return new NextResponse(JSON.stringify({
                message:'Appointment ID is required!',
                success:false,
            }), {status:400})
        }

        if(!Types.ObjectId.isValid(appointmentID)) {
            return new NextResponse(JSON.stringify({
                message:'Invalid ID!',
                success:false,
            }), {status:400})
        }

        await dbConnect()

        const {status }= await request.json()

        const isAppointmentStatusUpdate = await AppointmentModel.findByIdAndUpdate(appointmentID, {
            status,
        })

        if(!isAppointmentStatusUpdate) {
            return new NextResponse(JSON.stringify({
                message:'Appointment not found',
                success:false,
            }), {status:404})
        }

        return new NextResponse(JSON.stringify({
            message:'Appointment status upated successsfully',
            success:true,
        }), {status:200})


    } catch (error) {
        console.log("Error while updating appotment status",error)
        return new NextResponse(JSON.stringify({
            message:'Error while updating status',
            success:false,
        }), {status:500})
    }
}