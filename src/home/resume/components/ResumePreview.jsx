import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {

    const{resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    
    <div className='shadow-2xl h-full p-14  bg-white'  style={{
     
      borderTop: '15px solid black', // Adjust thickness as needed
      borderColor:resumeInfo?.themeColor
    }}>
      
        {/*Personal Detail*/}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>


        {/*Summary*/}
        <SummaryPreview resumeInfo={resumeInfo}/>


        {/*Professional Experience*/}
        <ProfessionalExperiencePreview resumeInfo={resumeInfo}/>


        {/*Educational Detail*/}
        <EducationalPreview resumeInfo={resumeInfo}/>


        {/*Skills*/}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview