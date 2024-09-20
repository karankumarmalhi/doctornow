import DoctorModel from "@/app/model/Doctor";
import dbConnct from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { Types, } from "mongoose";
import dbConnect from "@/lib/dbConnect";


export async function GET( request: NextRequest ) {
    try {
        await dbConnct()
        const doctors = await DoctorModel.find()

        if(!doctors) {
            return new NextResponse(JSON.stringify({message: "doctors not found"}),{status:400})
        }

        return new NextResponse(JSON.stringify({
            messag:'Doctors Fatched Successfully',
            success:true,
            doctors,
            }), {status:200});

    } catch (error:any) {
        return new NextResponse(JSON.stringify({message: "Error while fatching doctors"}),{status:500})
    }
}

//creating doctor 
export async function POST(request:Request) {
    try {
        await dbConnct()
        const { firstName, lastName,experience, address,availability, email, phone, profilePicture, qualifications, specialization,bio, gender } = await request.json()


           // Check if Doctor already exists in the database 
                const checkIfDoctorAlreadyExist = await DoctorModel.findOne({
                    email,
                })

                // Check if any doctor was found
                if (checkIfDoctorAlreadyExist) {
                    return new NextResponse(JSON.stringify({
                        success: false,
                        message: 'Doctor already exists with this email'
                    }), { status: 401 });
                }

             // Create if Doctor come first time

             const newDoctor = await DoctorModel.create(
                {
                firstName,
                lastName,
                experience,
                address,
                phone,
                email,
                profilePicture,
                bio,
                gender,
                qualifications,
                availability,
                specialization,
                })
            
            await newDoctor.save()

            return new NextResponse(JSON.stringify({message:'Doctor is created successfully', newDoctor}), {status:200})
        } catch (error) {
            console.log('Error while creating doctor',error)   
            return new NextResponse(JSON.stringify({message:'Error while creating new doctor'}), {status:500})         
        }
}

export async function PATCH( request: Request, {params}:{params:{id:any}} ) {
    try {
            const { searchParams }= new URL(request.url)
            const doctorId = searchParams.get('doctorId')
            

            if(!doctorId) {
                return Response.json({
                    success: false,
                    message: 'ID is required!',
                }, {status: 400});
            }

           

            if(!Types.ObjectId.isValid(doctorId)) {
                return new NextResponse(JSON.stringify({message:"Invalid Doctor id"}), {status:400})
            }

          
    
            const { firstName,lastName, experience, address,availability,phone, email, profilePicture, qualifications, specialization,bio } = await request.json()
    
    
            const updateDoctor = await DoctorModel.findByIdAndUpdate(doctorId, {
                firstName,
                lastName,
                experience, 
                address,
                availability,
                phone,
                email,
                profilePicture, 
                qualifications, 
                specialization,
                bio
            }, {new:true})
    
            if(!updateDoctor) {
                return Response.json({
                    success: false,
                    message: 'Doctor not found!',
                }, {status:400});
            }

            return Response.json({
                success: true,
                message: 'Update doctor data successfully',
                data:updateDoctor
            }, {status:201});
                
    } catch (error) {
        console.log('Error while updating data', error)

        return new NextResponse(JSON.stringify({
            message:"Error While Updating Doctor",
            success:false
        }), {status:500})
    }
}


export async function DELETE(request: Request,{params}:{params:{id:string}}) {
   try {

    const { searchParams }= new URL(request.url)
    const doctorId = searchParams.get('doctorId')


     if(!doctorId  || !Types.ObjectId.isValid(doctorId)) {
        return new  NextResponse(JSON.stringify({
            message:"Invalid ID Or Id is not found ",
            success:false,
        }), {status:400})  
     }

     await dbConnect()
     const doctor = await DoctorModel.findByIdAndDelete(doctorId)
     if(!doctor) {
        return new  NextResponse(JSON.stringify({
            message:"Doctor Not Found",
            success:false,  
        }), {status:404})
     }
 
     return new  NextResponse(JSON.stringify({
        message:"Doctor Deleted Successfully",
        success:true,
    }), {status:200})
   } catch (error) {
        console.log( 'Error while fatching doctor', error)
        return new  NextResponse(JSON.stringify({
            message:"Error While deleting doctor"
        }),{status:500})
   }
}