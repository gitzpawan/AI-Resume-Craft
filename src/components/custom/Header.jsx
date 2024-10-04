import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Play } from 'lucide-react';

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className='flex items-center justify-between p-2 ' style={{
    backgroundColor:'#EAECEB',
   
    
      
    }}>
      <img src='/logo.svg' width={150} height={100} alt="Logo" />
      <h1 className='font-extrabold text-5xl font-sans' style={{color:'black'}}>AI- RESUME CRAFT</h1>

      <div className='flex gap-4 items-center'>
        {isSignedIn ? (
          <>
            <Link to='/home'>
              <Button className='hover:scale-105 transition-all font-sans hover:shadow-md'  style={{ float: "right", margin: "2%",borderRadius: "55px", height:"2rem"}}>Home</Button>
            </Link>
            <UserButton className='px-8 py-5 mr-4 ' />
          </>
        ) : (
          <Link to='/auth/sign-in'>
            <Button className='w-40 hover:scale-105 font-sans transition-all hover:shadow-md h-12 rounded-custom text-lg animate-bounce' style={{ float: "right", margin: "2%",borderRadius: "10px",backgroundColor:"black"}}>Get Started</Button>
            
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
