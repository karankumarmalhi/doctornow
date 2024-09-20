import { Appointment } from "@/app/model/Appointment";
import { Doctor } from "@/app/model/Doctor";
import { Patient } from "@/app/model/Patient";

export interface ApiResponse {
    success:boolean,
    message:string,
    data?:Doctor | Patient | Appointment
}
