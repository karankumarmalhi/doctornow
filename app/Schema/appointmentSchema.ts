import {z} from 'zod'


export const appointmentSchema = z.object({
    appointmentDate:z.date({message:'Please select a appointment date form avilable dates!'}),
    appointmentTime:z.string({message: 'Please select a time for checkup!'}),
    status:z.string().min(1,'Please confirm this appointment!'),
    note:z.string().optional()
})