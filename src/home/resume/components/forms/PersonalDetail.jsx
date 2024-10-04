import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetail({enabledNext}) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(params);
    }, [params]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        setResumeInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));

        
        enabledNext(Object.values({ ...formData, [name]: value }).every(val => val));
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = { data: formData };

        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then(resp => {
            setLoading(false);
            console.log(resp);
            enabledNext(true);
           
            toast("Details Updated")
        }, (error) => {
            setLoading(false);
        });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 my-10' style={{ borderRadius: "20px" }}>
            <h2 className='font-sans font-bold text-lg text-center'> Personal Detail</h2>
            <p className='text-center'>Get started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName"  style={{ borderRadius: "10px" }} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName"  style={{ borderRadius: "10px" }} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle"   style={{ borderRadius: "10px" }} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address"   style={{ borderRadius: "10px" }} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone"   style={{ borderRadius: "10px" }} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email"   style={{ borderRadius: "10px" }} required onChange={handleInputChange} />
                    </div>
                </div>

                <div className='mt-3 flex justify-end'>
                    <Button  className="hover:scale-105 transition-all hover:shadow-md" disabled={loading} type="submit" style={{ borderRadius: "10px" }}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail;
