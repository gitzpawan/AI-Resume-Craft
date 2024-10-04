import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowBigLeft, ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Navigate, useParams } from 'react-router-dom';
import Theme from './Theme';


function FormSection() {

  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const{resumeid}=useParams();

  const [enableNext,setEnableNext]=useState(false)
  return (
    <div >
               <div className='flex justify-between items-center'>
<Theme/>              

               <div className='flex gap-3'>

               {activeFormIndex > 1 && (
    <Button className="hover:scale-105 transition-all hover:shadow-md" size="sm" style={{ borderRadius: "10px" }} onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
      <ArrowLeft />
    </Button>
  )}
  <Button  disabled={!enableNext} className="flex gap-2 hover:scale-105 transition-all hover:shadow-md" size="sm" style={{ borderRadius: "10px" }} onClick={() => setActiveFormIndex(activeFormIndex + 1)}>
    Next <ArrowRight />
  </Button>
               </div>
               </div>

      {/* Personal Detail*/}
     {activeFormIndex==1? <PersonalDetail enabledNext={(v)=>setEnableNext(v)}/>:activeFormIndex==2?  <Summary enabledNext={(v)=>setEnableNext(v)}/>:activeFormIndex==3?<Experience enabledNext={(v)=>setEnableNext(v)}/>:activeFormIndex==4?<Education/>:activeFormIndex==5?<Skills/>:activeFormIndex==6?<Navigate to={'/my-resume/'+resumeid+"/view"}/>:null}


      {/* Summary*/}
    


      {/* Experience*/}


      {/* Educational Detail*/}


      {/* Skill*/}
    </div>
  )
}

export default FormSection