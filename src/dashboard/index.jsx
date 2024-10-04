import { Button } from '@/components/ui/button';
import { Camera, Notebook, Play, VideoIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'



function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Start animation after 100ms

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "AI-Powered Suggestions",
      description: "Get personalized suggestions for your resume based on job descriptions and industry standards."
    },
    {
      title: "Customizable Templates",
      description: "Choose from a variety of professionally designed templates to fit your style and industry."
    },
    {
      title: "Easy to Use",
      description: "Our intuitive interface makes it easy to build, customize, and download your resume in minutes."
    }
  ];
  return (
    
    <div className='min-h-screen'style={{
      backgroundColor:'#EAECEB',
      color: 'black',
  
    }}>
      
      {/* Hero Section */}
      <section
  style={{
    backgroundColor: '#EAECEB',
    color: 'black',
    textAlign: 'center',
    padding: '4rem 0',
  }}
>
  <div className='container mx-auto px-4 py-8 flex justify-between'>
    <div className={`transition-transform duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-64'}`}>
      <img className='w-[25rem] h-auto' src='/mainimg.svg' alt="Main Image" />
    </div>
    <div className='flex flex-col gap-4'>
      <div className={`resume-template transition-opacity duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} style={{ position: 'relative', backgroundColor: 'white', borderRadius: '10px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '40px', backgroundColor: '#0081cf', borderRadius: '50%' }}></div>
        <p className='text-xl mb-2 font-medium font-sans'>
          Create a professional resume effortlessly with our AI-powered resume builder at just ₹10.
        </p>
        <p className='text-lg mb-2 font-semibold'>
          Stand out from the competition and land your dream job!
        </p>
      </div>
      <div className={`resume-template transition-opacity duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} style={{ position: 'relative', backgroundColor: 'white', borderRadius: '10px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '40px', backgroundColor: '#0081cf', borderRadius: '50%' }}></div>
        <p className='text-xl mb-2 font-medium font-sans'>
          Build Resume with ATS score more than 95%
        </p>
      </div>
     
      <div className='flex justify-center gap-4 mt-6'>
      <Link to='/auth/sign-in'>
        <Button className="hover:shadow-lg hover:scale-105 transition-all font-sans text-lg p-6" style={{ borderRadius: "10px", backgroundColor: "black" }}>
          <Notebook className='m-3' /> Get Started
        </Button>
        </Link>
        <Button className="hover:shadow-lg hover:scale-105 transition-all font-sans text-lg p-6" style={{ borderRadius: "60px", backgroundColor: "#0081cf" }}>
          <VideoIcon className='m-3' /> Watch Video
        </Button>
      </div>
    </div>
  </div>
</section>


      <section className='py-4' style={{ marginTop: "-50px" }}>
  <div className='container mx-auto px-4'>
    <h2 className='text-3xl font-bold text-center mb-12 font-sans '>RESUME SHORTLISTED IN</h2>
    <div className='flex flex-wrap justify-center'>
      <div className='w-1/4 px-4 mb-4 flex justify-center'>
        <img src='/amazon.svg' alt='Amazon Logo' className='h-16 animate-bounce' />
      </div>
      <div className='w-1/4 px-4 mb-4 flex justify-center'>
        <img src='/flipkart.svg' alt='Flipkart Logo' className='h-16 ' />
      </div>
      <div className='w-1/4 px-4 mb-4 flex justify-center'>
        <img src='/infosys.svg' alt='Accenture Logo' className='h-16 ' />
      </div>
      <div className='w-1/4 px-4 mb-4 flex justify-center'>
        <img src='/jio.svg' alt='TCS Logo' className='h-16 animate-bounce' />
      </div>
    </div>
  </div>
</section>

      {/* Features Section */}

      <section className='py-16 bg-black'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12 text-white font-sans gap-1'>FEATURES</h2>
        <div className='flex flex-wrap -mx-4'>
          {features.map((feature, index) => (
            <div key={index} className='w-full md:w-1/3 px-4 mb-8'>
              <div 
                className='bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105'
                style={{ borderRadius: "15px" }}
              >
                <h3 className='text-xl font-semibold mb-4'>{feature.title}</h3>
                <p className='text-gray-700'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Benefits Section */}

      <section className=' py-16'  style={{
          backgroundColor:'#EAECEB',
          color: 'black',
      
        }}>
        <div className='container mx-auto px-4'style={{
          backgroundColor:'#EAECEB',
          color: 'black',
      
        }}>
          <h2 className='text-3xl font-bold text-center mb-12'>Benefits</h2>
          <div className='text-center'>
            <p className='text-lg mb-4'>
              Our AI resume builder is designed to help you create a standout resume that showcases your skills and experiences effectively. 
              Save time and effort with our automated suggestions and customizable templates.
            </p>
            <a href='/auth/sign-in' className='bg-yellow-500 text-blue-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400'>
              Start Building Your Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className='bg-blue-600 text-white py-4'>
        <div className='container mx-auto px-4 text-center'>
          <p>&copy; 2024 Andromeda Infotech. All rights reserved.</p>
          <p>Follow us on <a href='#' className='text-yellow-500'>Twitter</a>, <a href='#' className='text-yellow-500'>Facebook</a>, and <a href='#' className='text-yellow-500'>LinkedIn</a>.</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
