import mongoose, {Schema, Document} from 'mongoose';


export interface User extends Document {
    username: string,
    email:string,
    password:string, 
    identity:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
} 

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required:[true,"Username is required"],
        trim:true,
    },
    email: {
        type: String,
        required:[true,"Email is required"],
        unique:true,
        match:[/.\@.+\..+/,'please use a valid email']
    },
    password : {
        type:String,
        required:[true, 'Password is required']
    },
    identity:{
        type:String,
        required:[true, 'Identity is required']
    },
    verifyCode:{
        type:String, 
        required:[ true,'Verify code is required']
    },
    verifyCodeExpiry:{
        type:Date, 
        required: [true,'Verify code Expiry is required']
    },
    isVerified:{
        type:Boolean,
        default:false,
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);

export default UserModel
