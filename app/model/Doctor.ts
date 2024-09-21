import mongoose, {Schema, Document, Types} from "mongoose";




export interface Availability extends Document {
    days:string,
    startTime:string,
    endTime:string,
}

export interface Contact extends Document {
    phone:string,
    email:string
} 

export const ContactSchema:Schema<Contact> = new Schema({
    phone: {
        type:String,
        required: [true,'Phone number is required!'],
        unique:true
    },
    email: {
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        match:[/.\@.+\..+/,'please use valid email']
    }
})

const AvailabilitySchema : Schema<Availability> = new Schema({
    days:{
        type:String,
        required:[true, "Please at least one day"]
    },
    startTime: {
        type: String,
        required: [true, 'Please starting and ending of your availability is required'],

    },
    endTime: {
        type: String,
        required: [true, 'Please starting and ending of your availability is required'], 
    }
})

export interface Doctor {
    _id:Types.ObjectId,
    firstName: string,
    lastName:string,
    gender:string,
    experience:string,
    specialization: string,
    qualifications: string,
    availability:Availability[],
    email:string,
    phone:string,
    address: string,
    profilePicture:string,
    bio:string,   
}

const DoctorSchema: Schema<Doctor> = new Schema({
    firstName:{
        type: String,
        required: [true, 'First name is required'],
        trim:true,
    },
    lastName:{
        type: String,
        required: [true, 'First name is required'],
        trim:true,
    },
    gender: {
        type:String,
        required:[true,"gender is required"]
    },
    experience:{
        type: String,
        default:"1",
    },
    specialization:{
        type:String,
        required:[true, 'Spacilization is required'],
        trim:true,
    },
    availability:[AvailabilitySchema],
    qualifications: {
        type:String,
    },
    email:String,
    phone:String,
    address:{
        type:String,
        required:[true,'Address is required'],
    },
    profilePicture:{
        type:String,
        required:[true, "Profile pic is required"]
    },
    bio:{
        type:String,
    }
}, {timestamps: true}) 


const DoctorModel =  (mongoose.models.Doctor as mongoose.Model<Doctor>) || (mongoose.model<Doctor>("Doctor", DoctorSchema))

export default DoctorModel