import mongoose, { Schema } from "mongoose";

export interface Patient {

    fullName:string,
    age: string,
    gender:string,
    phone:string,
    email:string,
    address:string,
    medicalHistory:string,
    
}

const PatientSchema: Schema<Patient> = new Schema({
    fullName: {
        type:String,
        required:[true, 'Name is reqired'],
        trim: true,
    },
    age: {
        type:String,
        required:[true,'Age is required'],
    },
    gender: {
        type:String,
        enum: ['Male', 'Female', 'Other'],
    },
    phone:{
        type:String,
        required:[true, "Phone number is required"]
    },
    email: {
        type:String,
        required:[true, 'Email is required'],
        match:[/.\@.+\..+/,'please use valid email']
    },
    address: {
        type: String,
        required:[true, 'Address is required'],
    },
    medicalHistory:{
        type:String,
        required: [true, 'Medical history is requied']
    }
}, {timestamps: true})


const PatientModel = (mongoose.models.Patient as mongoose.Model<Patient>) || mongoose.model<Patient>('Patient', PatientSchema)

export default PatientModel
