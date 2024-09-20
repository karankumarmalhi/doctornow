import {z} from 'zod'

export const useranameValidation = z
    
 

export const signUpSchema = z.object({
    username:z.string()
    .min(2, 'Username must be atleast 2 characters')
    .max(50, 'Username must be less than 49 characters')
    .regex(/^[a-zA-Z0-9]+$/,'Username must not contain spacial characters'),
    email:z.string().email({message: 'Invalid email address'}),
    password:z.string().min(6,{message:'password must be atleast 6 character'}),
    identity:z.string({ message:"Select one from thsese its important" })
})
