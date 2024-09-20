import { z } from 'zod';

export const PatientSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  age:z.string().min(1,'Date of Birth is required'),
  gender: z.string({message:"Select your gender"}),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  medicalHistory: z.string(),
});
