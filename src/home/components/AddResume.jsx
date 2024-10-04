import { Loader, Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
    
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
 import {v4 as uuidv4} from 'uuid' 
import GlobalApi from './../../../service/GlobalApi'

import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

function AddResume() {

    const[openDialog,setOpenDialog]=useState(false)
    const[resumeTitle,setResumeTitle]=useState();
    const{user}=useUser();
    const [loading,setLoading]=useState(false);
    const navigation=useNavigate()

    const onCreate=()=>{
        setLoading(true);
        const uuid=uuidv4();
        const data={
            data:{
            title:resumeTitle,
            resumeid:uuid,
            useremail:user?.primaryEmailAddress?.emailAddress,
            userName:user?.fullName
        }
    }
     GlobalApi.CreateNewResume(data).then(resp=>{
        console.log(resp.data.data.documentId);

        if(resp){
            setLoading(false);
            navigation('/home/resume/'+resp.data.data.documentId+'/edit')
        }
     },(error)=>{
        setLoading(false);
     })
    }
  return (
    <div>
      
        <div className='p-5 cursor-pointer py-15  items-center flex justify-center bg-slate-300 rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md border-dotted' onClick={()=>setOpenDialog(true)} style={{borderRadius:"25px"}}>
            <PlusSquare/>
        </div>
        <h2 className='text-center font-sans my-3 font-semibold'>Create New Resume</h2>
        <Dialog open={openDialog}>
 
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-center font-sans font-semibold">Create New Resume</DialogTitle>
      <DialogDescription>
        <p className="text-center font-sans font-medium">Add a title for your Resume</p>
       <Input className='mt-2 rounded-lg' style={{borderRadius:"10px"}}   placeholder="Ex.Java Developer" onChange={(e)=>setResumeTitle(e.target.value)}/>
      </DialogDescription>
      <div className='flex justify-end gap-5 mt-2'>
        <Button variant="outline" className="text-black" style={{borderRadius:"10px"}} onClick={()=>setOpenDialog(false)}>Cancel</Button>
        <Button disabled={!resumeTitle ||loading} onClick={()=>onCreate()} style={{borderRadius:"10px"}}>
            {loading?
            <Loader2 className='animate-spin'/>:'Create'
}
            </Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddResume