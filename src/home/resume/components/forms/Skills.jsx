import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {

    const [skillsList,setskillsList]=useState([{
        name:'',
        rating:0
    }])
const{resumeid}=useParams();
    const{resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
const[loading,setLoading]=useState(false);

    const handleChange=(index,name,value)=>{
        const newEntries = skillsList.slice();
      
        newEntries[index][name] = value;
        setskillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setskillsList([...skillsList,{
            name:'',
            rating:0
        }])
    }

    const RemoveSkills=()=>{
            setskillsList(skillsList=>skillsList.slice(0,-1))
    }

    const onSave=()=>{
        setLoading(true)
      const data={
        data:{
            skills:skillsList
        }
      }

      GlobalApi.UpdateResumeDetail(resumeid,data).then(resp=>{
        console.log(resp)
        setLoading(false)
        toast('Details Updated')
      },(error)=>{
        setLoading(false)
        toast('Server Error, Please try again !')

      })
    }

    useEffect(()=>{

        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })

    },[skillsList])
  return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 my-10' style={{ borderRadius: "20px" }}>
                <h2 className='font-sans font-bold text-lg text-center'>Skills</h2>
                <p className='text-center'>Add your top Professional Skills</p>

                <div>
                    {skillsList.map((item,index)=>(
                        <div key={index} className='flex justify-between border p-3 shadow-md gap-2 mb-2'>
                            <div>
                                <label className='text-sm'>Name</label>
                                <Input onChange={(e)=>handleChange(index,'name',e.target.value)} style={{borderRadius:"10px"}}/>
                                </div>
                                <Rating style={{maxWidth:130}} value={item.rating} onChange={(v)=>handleChange(index,'rating',v)}/>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button onClick={AddNewSkills} variant="outline" className="border-primary text-primary" style={{ borderRadius: "10px" }}>+ Add More Skills</Button>
                        <Button onClick={RemoveSkills} variant="outline" className="border-primary text-primary" style={{ borderRadius: "10px" }}>Remove Skills</Button>
                    </div>
                    <Button disabled={loading} onClick={onSave} style={{ borderRadius: "10px" }}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
                </div>
    </div>
  )
}

export default Skills