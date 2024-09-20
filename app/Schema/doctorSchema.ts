import { array, z } from "zod"

export const doctorSchema = z.object({
    firstName:z.string().min(1,'First name is required!'),
    lastName:z.string({message:"Last name is required"}),
    gender:z.string(),
    experience:z.string().optional(),
    specialization:z.string().min(1,'Spacialization is required'),
    qualifications:z.string({message:"Qualification is required"}),
    availability: z.array(
        z.object({
          days:z.string().min(1, 'Day is required'),
          startTime: z.string().min(1, 'Start time is required'),
          endTime: z.string().min(1, 'End time is required'),
        })
      ),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
    address: z.string().min(1, 'address is required'),
    profilePicture: z.string(), 
    bio: z.string().optional(),
})