    import DoctorModel from "@/app/model/Doctor";
    import dbConnect from "@/lib/dbConnect";
    import { NextResponse } from "next/server";

    export async function GET( request: Request,context:{params : any}) {
        try {
            await dbConnect()
            const category = context.params.category
            console.log(category)

        
            if(!category) {
                return new NextResponse(JSON.stringify({
                    message:'Category is required!',
                    success:false,
                }),{status:400})
            }
            const doctors = await DoctorModel.find({
                specialization: category,
            })

            if(!doctors) {
                return new NextResponse(JSON.stringify({
                    message:'Not found',
                    success:false,
                }),{status:404})
            }
            console.log(doctors)

            return new NextResponse(JSON.stringify({
                message:'Doctor of this category fatched successful',
                success:true,
                data:doctors
            }),{status:200})
        } catch (error) {

            console.log("Error while fatching doctor by category", error);
            return new NextResponse(JSON.stringify({
                message:'Error while fatching doctor by category',
                success:false,
            }),{status:500})
        }
    }
