import DoctorModel from "@/app/model/Doctor";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    try {
        await dbConnect()
        const { searchParams  } = new URL(request.url)
        const firstName = searchParams.get("firstName")
        const lastName = searchParams.get("lastName")

        const listOfDoctorByName = await DoctorModel.findOne({
            $and:[
                { firstName:firstName},
                {lastName:lastName},
            ]
        })

        if(!lastName && !lastName) {
            return new NextResponse(JSON.stringify({
                message:'Name is required!',
                success:false,
            }),{status:400})
        }

        if(!listOfDoctorByName) {
            return new NextResponse(JSON.stringify({
                message:'Not found',
                success:false,
            }),{status:404})
        }


        return new NextResponse(JSON.stringify({
            message:'Doctor by name fatched successful',
            success:true,
            data:listOfDoctorByName
        }),{status:200})
    } catch (error) {

        console.log("Error while fatching doctor by name", error);
        return new NextResponse(JSON.stringify({
            message:'Error while fatching doctor by name',
            success:false,
        }),{status:500})
    }
}