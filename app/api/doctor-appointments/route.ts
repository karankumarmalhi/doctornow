import AppointmentModel from "@/app/model/Appointment"
import dbConnect from "@/lib/dbConnect"
import mongoose, { Types } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export async function GET( request:NextRequest, {params}:{params:any}) {

    await dbConnect()
        try {
           const searchParams = request.nextUrl.searchParams
            const doctorId = searchParams.get('doctorId')
            if(!doctorId) {
                return new NextResponse(JSON.stringify({
                    message:'Appointment Id is required',
                    success:false
                }), {status:400})
            }

            if(!Types.ObjectId.isValid(doctorId)) {
                return new NextResponse(JSON.stringify({
                    message:'Invalid ID',
                    success:false
                }), {status:400})
            }

            const appointments = await AppointmentModel.aggregate([
                {
                  '$match': {
                    'doctor': new mongoose.Types.ObjectId(doctorId)
                  }
                }, {
                  '$lookup': {
                    'from':'patients', 
                    'localField': 'patient', 
                    'foreignField': '_id', 
                    'as': 'patientDetails'
                  }
                }
              ])

            

           if(!appointments) {
            return new NextResponse(JSON.stringify({
                message:'Not Found',
                success:false
            }), {status:404})
           }

            return new NextResponse(JSON.stringify({
                message:'Appointment found Successfully',
                success:true,
                appointments
            }), {status:200})


        } catch (error) {
            console.log('Error while fatching appointment ', error)

            return new NextResponse(JSON.stringify({
                message:'Error while fatching appointment',
                success:false
            }), {status:500})
        }
}