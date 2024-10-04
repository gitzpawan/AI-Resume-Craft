import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className='flex justify-center my-1 gap-5 items-center bg-[#EAECEB]' >
      <div>
      <div className='bg-blue-600 text-white p-5 relative' style={{ borderRadius: "40px", maxWidth: "400px", margin: "auto", position: "relative" }}>
  <h2 className='m-2 font-sans font-medium text-lg text-center'>SIGN UP & CREATE A PROFESSIONAL RESUME IN 1 MINUTE</h2>
  <div className='absolute bottom-2 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-blue-600' style={{ transform: "translate(-5%, 31%)" }}></div>
</div>

      <img className="w-[30rem]" src='/authimg.svg'/>
      
      </div>
      <div>

        <SignIn/>
        </div>
    </div>
  )
}

export default SignInPage