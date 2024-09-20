import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET
    });
    

    interface CloudinaryUploadResult {
        puublic_id:string,
        [key:string] : any
    }


    export async function POST( request:Request ) {
        try {
            const formData = await request.formData()
            const file = formData.get("file") as File | null
        
            if(!file) {
                console.log("File not found")
                return new NextResponse(JSON.stringify({
                    message:'File not found',
                    success:false
                }), {status:400})
            }

            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const result = await new Promise<CloudinaryUploadResult>(
                (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                        {folder:"next-online-appoint-app"},
                        (error, result)=> {
                            if(error) reject(error);
                            else resolve(result as unknown as CloudinaryUploadResult);
                        }
                    )
                    uploadStream.end(buffer)
                }
            )
            console.log(result)


            return new NextResponse(JSON.stringify({
                message:'Image uploaded successfully',
                success:true,
                data:result.url
            }), {status:200})

        } catch (error) {
            console.log("Upload image failed",error)
            return new NextResponse(JSON.stringify({
                message:'Upload image failed',
                success:false,
            }), {status:500})
        }
    }
 