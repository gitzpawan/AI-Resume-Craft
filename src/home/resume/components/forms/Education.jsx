import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Education() {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ]);

    const handleChange = (event, index) => {
        const newEntries = educationalList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    };

    const onSave=()=>{
        setLoading(true)
        const data={
          data:{
            Education:educationalList
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

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            Education: educationalList
        });
    }, [educationalList]);

    const AddNewEducation = () => {
        setEducationalList([...educationalList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }]);
    };

    const RemoveEducation = () => {
        if (educationalList.length > 1) {
            setEducationalList(educationalList => educationalList.slice(0, -1));
        }
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 my-10' style={{ borderRadius: "20px" }}>
                <h2 className='font-sans font-bold text-lg text-center'>Educational Experience</h2>
                <p className='text-center'>Add your Education</p>
                <div>
                    {educationalList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 shadow-md' style={{ borderRadius: "10px" }}>
                                <div className='col-span-2'>
                                    <label className='text-sm'>University Name</label>
                                    <Input name="universityName" onChange={(e) => handleChange(e, index)} style={{ borderRadius: "10px" }} />
                                </div>
                                <div>
                                    <label className='text-sm'>Degree</label>
                                    <Input name="degree" onChange={(e) => handleChange(e, index)} style={{ borderRadius: "10px" }} />
                                </div>
                                <div>
                                    <label className='text-sm'>Major</label>
                                    <Input name="major" onChange={(e) => handleChange(e, index)} style={{ borderRadius: "10px" }} />
                                </div>
                                <div>
                                    <label className='text-sm'>Start Date</label>
                                    <Input type="date" name="startDate" onChange={(e) => handleChange(e, index)} style={{ borderRadius: "10px" }} />
                                </div>
                                <div>
                                    <label className='text-sm'>End Date</label>
                                    <Input type="date" name="endDate" onChange={(e) => handleChange(e, index)} style={{ borderRadius: "10px" }} />
                                </div>
                                <div className='col-span-2'>
                                    <label className='text-sm'>Description</label>
                                    <Textarea name="description" onChange={(e) => handleChange(e, index)} style={{ borderRadius: "10px" }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button onClick={AddNewEducation} variant="outline" className="border-primary text-primary" style={{ borderRadius: "10px" }}>+ Add More Education</Button>
                        <Button onClick={RemoveEducation} variant="outline" className="border-primary text-primary" style={{ borderRadius: "10px" }}>Remove Education</Button>
                    </div>
                    <Button disabled={loading} onClick={onSave} style={{ borderRadius: "10px" }}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Education;
