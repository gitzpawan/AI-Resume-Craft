import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
  

function Theme() {

    const colors=[
           "#d9c7c3", "#415ba7", "#9a61cf", "#b05ecd", "#bf88bb",
           "#050505", "#9be9a8", "#2caa41", "#31bfaa", "#45a4d1",
           "#cdd198", "#05f3cf", "#1bab6c","#c95ec1","#e8e26c"



    ]

    const{resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    const onColorSelect=(color)=>{
        setResumeInfo({
            ...resumeInfo,
            themeColor:color
        })

    }
  return (

        <Popover>
  <PopoverTrigger >                <Button variant="outline" size="sm" className="flex gap-2 border-primary text-primary" style={{borderRadius:"10px"}}><LayoutGrid/>Theme</Button>
  </PopoverTrigger>
  <PopoverContent>
    <h2 className='mb-2 font-sans text-center font-semibold bg-white' style={{borderRadius:"15px"}}>Select Theme Color</h2>
    <div className='grid grid-cols-5 gap-3 bg-white' style={{borderRadius:"10px"}}>
    
    {colors.map((item,index)=>(
    <div className='h-5 w-5 cursor-pointer hover:border-black border' onClick={()=>onColorSelect(item)} style={{background:item,borderRadius:"50%"}}>


    </div>
  ))}
  </div>
  
  </PopoverContent>
</Popover>
   
  )
}

export default Theme