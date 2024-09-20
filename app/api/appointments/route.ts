import AppointmentModel from "@/app/model/Appointment";
import { appointmentSchema } from "@/app/Schema/appointmentSchema";
import dbConnect from "@/lib/dbConnect";
import dbConnct from "@/lib/dbConnect";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";


// Get all appointments
// Only admin can fatched all apointments
// Doctor only can fatch their all appointment 
// If any patient booked on eor more appointent then He/She can see her/him appointment 
// If any patient with same doctor and same time booked appointment, then Show error
// If any patient want cancel their appointment then remove cancel appointment from database 
// Patient also chaged their time ,day and as well as doctor 


 export async function GET(request: Request,) {
    try {
        await dbConnct()
        const listOfAllAppointment = await AppointmentModel.find();
        if(!listOfAllAppointment) {
            return new NextResponse(JSON.stringify({
                message:'Appointment not found'
            }), {status:400})
        }
        return new NextResponse(JSON.stringify({
            message:'Appointment fateched successfully',
            success:true,
            data:listOfAllAppointment
        }));
    } catch (error) {
        return new NextResponse(JSON.stringify({
            message:'Error while fatching appointments',
            success:false
        }))

    }
 }  


 export async function POST(request:Request) {

    // Creating a new Appointment 
    try {
        const { searchParams } = new URL(request.url)
        const patientID = searchParams.get("patientId")
        const doctorID = searchParams.get("doctorId");
        console.log(doctorID)
        
        if(!patientID || !doctorID) {
           return new NextResponse(JSON.stringify({
            message:'Patient And Doctor IDs are required',
            success:false
           }),{status:400})
        }

        await dbConnect()
        //Validate the request Data
        const {appointmentDate,appointmentTime,status ,note, } = await request.json()

        if (!appointmentDate || !appointmentTime || !status) {
            return new NextResponse(JSON.stringify({
                message: 'All fields (appointmentDate, appointmentTime, status) are required',
                success: false
            }), { status: 400 });
        }   
        // Check if same patient with booked already appointment at same time,date doctor appointment 
        const isAlreadyAppointmentBookedWithSameDoctorOrPatient = await AppointmentModel.findOne({
                        patient:patientID,
                        doctor:doctorID,
                        appointmentDate:appointmentDate,
                        appointmentTime:appointmentTime
        })

        if(isAlreadyAppointmentBookedWithSameDoctorOrPatient) {
            return new NextResponse(JSON.stringify({
                message:'Your appointment booked already with same date and time',
                success:true,
                isAlreadyAppointmentBookedWithSameDoctorOrPatient,
            }), {status:400});
        }
        
        const createNewAppointment = new AppointmentModel({
            patient:patientID,
            doctor:doctorID,
            appointmentDate,
            appointmentTime,
            status,
            note,
        });
        await createNewAppointment.save()


            return new NextResponse(JSON.stringify({
                message:'your appointment booked successfully',
                success:true,
                createNewAppointment
            }))

        } catch (error:any) {

            console.log("Error while creating appointment", error)
            return new NextResponse(JSON.stringify({
                message:'Error while creating appointment',
                success:false,
                error:error.message
            }), {status:500});
        }
}

 export async function PATCH( request:Request, {params}:{params:{id:string}} ) {
    try {

        await dbConnct()
        const { searchParams } = new URL(request.url)
        const appointmentID = searchParams.get("appoitmentID")
        const patientID = searchParams.get("patientID")
        const doctotID = searchParams.get("doctorID");
        
        if(!patientID || !doctotID) {
           return new NextResponse(JSON.stringify({
            message:'Patient And Doctor IDs are required',
            success:false
           }),{status:400})
        }

        if( !appointmentID ||!Types.ObjectId.isValid(appointmentID)) {
            return new NextResponse(JSON.stringify({
                message:'Invalid ID or Appointment ID is missing!'
            }));
        }

         const { patient, doctor, appointmentDate,appointmentTime,status ,note, } = await request.json()

        // find the appointment and Update the status

        const updateStatusAppointment = await AppointmentModel.findByIdAndUpdate(appointmentID, {
            patient, doctor, appointmentDate, appointmentTime, status, note
        }, {new:true})

        if(!updateStatusAppointment) {
            return new NextResponse(JSON.stringify({
                message:'Appointment Not Found',
                success:false,
            }) , {status:404});

        }
       return new NextResponse(JSON.stringify({
                message:'Appointment Updated Successfully',
                success:true,
                updateStatusAppointment,
            }) , {status:201});
    } catch (error) {
        console.log('Error While updating status', error);
        return new NextResponse(JSON.stringify({
            message:'Error while updating appointment',
            success:false,
        }) , {status:500});
    }
}
export async function DELETE( request:Request ) {
 try {
    await dbConnct()

    const { searchParams } = new URL(request.url)
    const appointmentID = searchParams.get('appointmentID')

    if(!appointmentID) {
        return new NextResponse(JSON.stringify({
            message:'ID is missing',
            success:false,
        }) , {status:400});
    }

    if(!Types.ObjectId.isValid(appointmentID)) {
        return new NextResponse(JSON.stringify({
            message:'Invalid ID',
            success:false,
        }),{status:400});
    }

    const deleteApointment = await AppointmentModel.findByIdAndDelete(appointmentID)
    if(deleteApointment) {
        return new NextResponse(JSON.stringify({
            message:'Appointment not found',
            success:false,
        }) , {status:404});
    }

    return new NextResponse(JSON.stringify({
        message:'Appointment Deleted successfully',
        success:true,
    }) , {status:200});
 } catch (error:any) {
    console.log('Error while deleting',error)
    return new NextResponse(JSON.stringify({
        message:'Error while deleting',
        success:false,
        error:error.message
    }) , {status:500});
 }
}


