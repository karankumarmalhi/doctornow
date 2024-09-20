/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const axiosClient = axios.create({
    baseURL:'http://localhost:3000/api',
})

const getDoctor = () => axiosClient.get('/doctors');


export default{
    getDoctor
}
