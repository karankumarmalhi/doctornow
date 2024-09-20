import Patient from "@/app/model/Patient";
import dbConnct from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import dbConnect from "@/lib/dbConnect";


export async function GET( request:Request, {params}:{params:{id:string}}) {

    await dbConnct()
        try {
            const patients  = await Patient.find()


            if(!patients) {
                return new NextResponse(JSON.stringify({
                    message:'Patient Not Found',
                    success:false
                }), {status:404})
            }
            return new NextResponse(JSON.stringify({
                message:'Patients Fatched Successfully',
                success:true,
                patients
            }), {status:200})

        } catch (error) {
            console.log('Error while fatching Patient ', error)
            return new NextResponse(JSON.stringify({
                message:'Error while fatching Patients',
                success:false
            }), {status:500})
        }
}
export async function POST(request:Request) {

    // Creating a new Appointment 
    try {
        await dbConnect()
        //Validate the request Data
        const { address,age,email,phone,fullName, gender,medicalHistory} = await request.json()
        console.log(address, fullName)
        const isPatientAlreadyExist = await Patient.findOne({
          email,
        })

        if(isPatientAlreadyExist) {
            return new NextResponse(JSON.stringify({
                message:'Patient with this email exsits',
                success:false,
                data:isPatientAlreadyExist,
            }), {status:400})
        }
        
        const createNewPatient =  await Patient.create({
            address,
            age,
            email,
            phone,
            fullName, 
            gender,
            medicalHistory,
        });

        
        return new NextResponse(JSON.stringify({
            message:'Patients created successfully',
            success:true,
            data:createNewPatient
        }), {status:200})

        } catch (error) {
            console.log('Error while creaing Patient!', error)
            return new NextResponse(JSON.stringify({
                message:'Error while creating patient',
                success:false,
            }), {status:500})
        }
}
export async function PATCH( request: NextRequest, {params}:{params:{id:string}} ) {
    try {
            // Check by Id, patient exist or not
            const searchParams = request.nextUrl.searchParams
            const patientId  = searchParams.get('patientId')



            if(!patientId){
                return new NextResponse(JSON.stringify({
                    message:'ID is required',
                    success:false
                }), {status:400})
            }

            
            if( !Types.ObjectId.isValid(patientId)) {
                return new NextResponse(JSON.stringify({
                    message:'ID is required',
                    success:false
                }), {status:400})
            }
    
            const { 
                address,
                age,
                email,
                phone,
                fullName, 
                gender,
                medicalHistory,

             } = await request.json()
    
    
            const updatePatient = await Patient.findByIdAndUpdate(patientId, {
                address,
                age,
                email,
                phone,
                fullName, 
                gender,
                medicalHistory,

            }, {new:true})
    
            if(!updatePatient) {
                return new NextResponse(JSON.stringify({
                    message:'Patient Not Found',
                    success:false
                }), {status:404})
            }

            return new NextResponse(JSON.stringify({
                message:'Updated Successfully',
                success:true
            }), {status:201})
                
    } catch (error) {
        console.log('Error while updating data',error)

        return Response.json({
            success: false,
            message: 'Error while updating data',
        }, {status:500});
    }
}
export async function DELETE( request: NextRequest, {params}:{params:{id:string}} ) {
    try {
            // Check by Id, patient exist or not
            const searchParams = request.nextUrl.searchParams
            const patientId  = searchParams.get('patientId')



            if(!patientId  || Types.ObjectId.isValid(patientId)) {
                return new NextResponse(JSON.stringify({
                    message:'ID is required',
                    success:false
                }), {status:400})
            }
    
            const updatePatient = await Patient.findByIdAndDelete(patientId)
    
            if(!updatePatient) {
                return new NextResponse(JSON.stringify({
                    message:'Patient Not Found',
                    success:false
                }), {status:404})
            }

            return new NextResponse(JSON.stringify({
                message:'Deleted Successfully',
                success:true
            }), {status:201})
                
    } catch (error) {
        console.log('Error while delete data', error)

        return Response.json({
            success: false,
            message: 'Error while delete patiient',
        }, {status:500});
    }
}

