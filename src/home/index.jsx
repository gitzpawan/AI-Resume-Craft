import Header from '@/components/custom/Header'
import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import { data } from 'autoprefixer';
import ResumeCardItem from './components/ResumeCardItem';


function Home() {

  const{user}=useUser();

  const[resumeList,setResumeList]=useState([])

  useEffect(()=>{
    user&&GetResumeList()

  },[user])
  const GetResumeList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(resp=>{
      
      setResumeList(resp.data.data);
    })
  }
  return (
    <div style={{
      backgroundColor:'#EAECEB',
      color: 'black',
      textAlign: 'center',
      padding: '4rem 0', 
    }}>
        <Header/>
        <div className='p-10 '>
       
           <p className='text-center font-semibold font-sans text-2xl mb-10'>Start creating & explore the AI - Resume Craft for amazing AI generated CV's</p>

           <div className=' p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 rounded-lg gap-9' >
           <AddResume/>
           {resumeList.length>0&&resumeList.map((resume,index)=>(
            <ResumeCardItem resume={resume} key={index}/>
           )
          )}
           </div>
           </div>
      
    </div>
  )
}

export default Home