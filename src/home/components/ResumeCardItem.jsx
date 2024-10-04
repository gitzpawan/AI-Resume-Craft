import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCardItem({resume}) {
  return (
    <Link to={'/home/resume/'+resume.documentId+"/edit"}>
        <div className='p-14 bg-slate-400 h-[280px] hover:scale-105 transition-all hover:shadow-md border-black flex items-center justify-center  cursor-pointer' style={{borderRadius:"25px"}}>
            <img src='/logo.svg'/>

        </div>
        <h2 className='text-center font-sans my-3 font-semibold' style={{color:"black"}}>{resume.title}</h2>
    </Link>
  )
}

export default ResumeCardItem