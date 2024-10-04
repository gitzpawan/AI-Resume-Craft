import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt = "Job Title: {jobTitle}, Depends on job title give me summary for my resume within 4-5 lines in JSON format with field experience_level and summary for fresher, mid-level and experienced";

function Summary({ enabledNext }) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState('');
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([]);

    useEffect(() => {
        if (summery) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery
            });
        }
    }, [summery, resumeInfo, setResumeInfo]);

    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log(PROMPT);

        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            const rawText = result.response.text();
            console.log("Raw AI Response:", rawText); // Log the raw response

            // Clean and format the response
            const sanitizedText = rawText.trim().replace(/[\u0000-\u001F\u007F]/g, ''); // Removes control characters

            // Attempt to wrap the response in an array if it isn't valid JSON
            const wrappedResponse = `[${sanitizedText}]`;
            console.log("Wrapped AI Response:", wrappedResponse); // Log the wrapped response

            let parsedResponse;
            try {
                parsedResponse = JSON.parse(wrappedResponse);
            } catch (parseError) {
                console.error('Failed to parse JSON:', parseError);
                toast.error("Failed to parse AI response. Please check the format.");
                return;
            }

            // Ensure the response is an array
            if (Array.isArray(parsedResponse)) {
                setAiGeneratedSummeryList(parsedResponse);
            } else {
                throw new Error("Unexpected response format.");
            }
        } catch (error) {
            console.error('Error processing AI response:', error);
            toast.error("Failed to generate summary. Please check the AI response.");
        } finally {
            setLoading(false);
        }
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = { data: { summery: summery } };

        GlobalApi.UpdateResumeDetail(params?.resumeid, data)
            .then(resp => {
                setLoading(false);
                console.log(resp);
                enabledNext(true);
                toast("Details Updated");
            })
            .catch(error => {
                setLoading(false);
                console.error("Error updating resume:", error);
            });
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 my-10' style={{ borderRadius: "20px" }}>
                <h2 className='font-sans font-bold text-lg text-center'>Summary</h2>
                <p className='text-center'>Add Summary for the desired job role</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button type="button" variant="outline" size="sm" className="border-primary text-primary flex gap-2 hover:scale-105 transition-all hover:shadow-md" onClick={GenerateSummeryFromAI} style={{ borderRadius: "10px" }}>
                            <Brain /> Generate with AI
                        </Button>
                    </div>
                    <Textarea className='mt-5' style={{ borderRadius: "15px" }} onChange={(e) => setSummery(e.target.value)} />

                    <div className='mt-1 flex justify-end'>
                        <Button className="my-2 hover:scale-105 transition-all hover:shadow-md" disabled={loading} type="submit" style={{ borderRadius: "10px" }}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList.length > 0 && (
                <div className='shadow-md border-t-purple-600 border-t-4 p-2' style={{borderRadius:"15px"}}>
                    <h2 className='font-bold text-lg text-center font-sans'><Brain/>AI Generated Suggestions</h2>
                    <p className='text-center text-sm font-sans'>You can copy/paste from the suggestions.</p>
                    {aiGeneratedSummeryList.map((item, index) => (
                        <div key={index}>
                            <h2 className='font-bold my-1'>Level: {item.experience_level}</h2>
                            <p>{item.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summary;
