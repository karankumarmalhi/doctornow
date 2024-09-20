import VerificationEmail from "@/emails/VerificationEmail";
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerification(
    email:string,
    verifyCode:string,
    username: string

): Promise<ApiResponse> {
    try {

         
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verication code',
            react: VerificationEmail({username, otp:verifyCode})
        })

        return {success:true,message:'Verification code send successfully'}
    } catch (emailError) {
        console.log('Error while sending verification code ', emailError)
        return {success:false,message:'Failed to send verification code'}
    }
}
 