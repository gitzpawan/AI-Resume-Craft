import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL+"/api/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});


const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);

const GetUserResumes=(useremail)=> axiosClient.get('/user-resumes?filters[useremail][$eq]='+useremail);

const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data);

const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id+"?populate=*")

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById
};
