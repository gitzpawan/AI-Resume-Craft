import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
   workSummery: ''  
};

function Experience() {
    const [experienceList, setExperienceList] = useState([formField]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const AddNewExperience = () => {
        setExperienceList([...experienceList, { ...formField }]); // Ensure new object is created
    };

    const RemoveExperience = () => {
        setExperienceList(experienceList.slice(0, -1));
    };

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const onSave=()=>{
        setLoading(true)
        const data={
          data:{
          Experience:experienceList
          }
        }
       
        GlobalApi.UpdateResumeDetail(params.resumeid,data).then(resp=>{
          console.log(resp);
          setLoading(false)
          toast('Details updated !')
        },(error)=>{
          setLoading(false);
          toast('Server Error, Please try again!')
        })
    
      }
    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            Experience:experienceList
        });
    }, [experienceList]);

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 my-10' style={{ borderRadius: "20px" }}>
                <h2 className='font-sans font-bold text-lg text-center'>Professional Experience</h2>
                <p className='text-center'>Add your job's experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 shadow-md' style={{ borderRadius: "10px" }}>
                                <div>
                                    <label className='text-sm'>Designation Title</label>
                                    <Input name="title" onChange={(event) => handleChange(index, event)} style={{ borderRadius: "10px" }} required />
                                </div>
                                <div>
                                    <label className='text-sm'>Company Name</label>
                                    <Input name="companyName"  onChange={(event) => handleChange(index, event)} style={{ borderRadius: "10px" }} required />
                                </div>
                                <div>
                                    <label className='text-sm'>City</label>
                                    <Input name="city"  onChange={(event) => handleChange(index, event)} style={{ borderRadius: "10px" }} required />
                                </div>
                                <div>
                                    <label className='text-sm'>State</label>
                                    <Input name="state"  onChange={(event) => handleChange(index, event)} style={{ borderRadius: "10px" }} required />
                                </div>
                                <div>
                                    <label className='text-sm'>Start Date</label>
                                    <Input type="date"  name="startDate" onChange={(event) => handleChange(index, event)} style={{ borderRadius: "10px" }} required />
                                </div>
                                <div>
                                    <label className='text-sm'>End Date</label>
                                    <Input type="date" name="endDate"  onChange={(event) => handleChange(index, event)} style={{ borderRadius: "10px" }} required />
                                </div>
                                <div className='col-span-2'>
                                    <RichTextEditor  index={index} onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button onClick={AddNewExperience} variant="outline" className="border-primary text-primary" style={{ borderRadius: "10px" }}>+ Add More Experience</Button>
                        <Button onClick={RemoveExperience} variant="outline" className="border-primary text-primary" style={{ borderRadius: "10px" }}>Remove Experience</Button>
                    </div>
                    <Button disabled={loading} onClick={onSave} style={{ borderRadius: "10px" }}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Experience;
