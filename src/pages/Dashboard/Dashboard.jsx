import React, { useContext, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import CustomRoutes from '../../routes/CustomRoutes'
import NAvbar from '../../components/NAvbar';
import Activity from '../../components/Activity';
import { Context } from '../../context/Context';

function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const {setToken} = useContext(Context)

  useEffect(() => {
    setToken(accessToken)
  }, [accessToken])


  return (
    <div className='flex justify-between'>
      <NAvbar />
      <div className='h-[100vh] overflow-y-auto w-[60%]'>
        <CustomRoutes />

      </div>
      <Activity />
    </div>
  )
}

export default Dashboard
