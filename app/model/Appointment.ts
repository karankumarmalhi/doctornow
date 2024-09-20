import mongoose, { Schema } from "mongoose";

import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { User } from "./User";

export interface Appointment extends Document{
    user:User
    patient: Patient,
    doctor:Doctor,
    appointmentDate:Date,
    appointmentTime:string,
    status:string,
    note:string,
}

const AppointmentSchema:Schema<Appointment> = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        ref:'Patient',
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor',
    },
    appointmentDate:{
        type: Date,
        required:true,
    },
    appointmentTime: {
        type:String,
        required:true,
    },
    status: {
        type: String,
        default:'Pending',
    },
    note: {
        type:String,
    }
    
},{timestamps: true})

const AppointmentModel = (mongoose.models.Appointment as mongoose.Model<Appointment>) || mongoose.model<Appointment>('Appointment',AppointmentSchema)

export default AppointmentModel;