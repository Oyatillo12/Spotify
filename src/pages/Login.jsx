import React from 'react'
import { CLIENT_ID } from '../hooks/useEnv'

function Login() {
    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`

  return (
    <div className='login-wrapper flex items-center justify-center overflow-y-auto h-[100vh]'>
        <a className='text-[20px] text-white w-[120px] py-3 rounded-lg bg-slate-400 text-center hover:scale-110 hover:bg-slate-500 duration-300' href={AUTH_URL}>Login</a>
    </div>
  )
}

export default Login
