import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/home/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from "react-web-share";

function ViewResume() {
    const[resumeInfo,setResumeInfo]=useState();

    const{resumeid}=useParams();

    useEffect(()=>{
        GetResumeInfo();
       

    },[])

    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeid).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data)
        })

    }

    const HandleDownload=()=>{
      window.print();
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div style={{
        backgroundColor:"#EAECEB"
    }}>
      <div id="no-print">
        <Header/>
       <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <h2 className='text-center font-sans text-2xl font-medium my-2'>Congratulations! Your Resume has been generated successfully!</h2>
        <p className='text-center font-sans text-gray-500'>You are now ready to download and share your resume with your friends</p>
        <div className='flex justify-between my-10'>
            <Button className="mb-2 hover:scale-105 transition-all hover:shadow-md" onClick={HandleDownload} style={{borderRadius:"25px"}}>Download</Button>
            <RWebShare
        data={{
          text: "Create Resume with ATS score more than 95% in just a minute with AI RESUME CRAFT's Gemini AI powered features now at just Rs-10-/ for lifetime.",
          url: import.meta.env.VITE_BASE_URL+"/my-resume"+resumeid+"/view",
          title: "AI-RESUME CRAFT",
        }}
        onClick={() => console.log("shared successfully!")}

      >
         <Button className="mb-2 hover:scale-105 transition-all hover:shadow-md" style={{borderRadius:"25px"}}>Share</Button>
      </RWebShare>
           
        </div>
        </div>
        
       </div>
    </div>
    <div id="print-area" className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <ResumePreview/>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume