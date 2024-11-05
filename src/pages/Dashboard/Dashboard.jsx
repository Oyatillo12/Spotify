import React, { useContext, useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import CustomRoutes from '../../routes/CustomRoutes'
import NAvbar from '../../components/NAvbar';
import Activity from '../../components/Activity';
import { Context } from '../../context/Context';
import SpotifyWebPlayer from 'react-spotify-web-playback';

function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const { setToken, token, uri, player, setPlayer } = useContext(Context)

  useEffect(() => {
    setToken(accessToken)
  }, [accessToken])


  return (
    <>
      <div className='flex justify-between'>
        <NAvbar />
        <div className='h-[100vh] overflow-y-auto w-[60%]'>
          <CustomRoutes />

        </div>
        <Activity />
      </div>
      <div className='absolute bottom-0  w-full z-50'>

        <SpotifyWebPlayer
          hideAttribution
          magnifySliderOnHover
          styles={{cursor: 'pointer'}}
          token={token}
          uris={uri ? [uri] : []}
          play={player}
          callback={(e) => {
            if (e.isPlaying != player) {
              setPlayer(false)
            }
          }}
        />
      </div>
    </>
  )
}

export default Dashboard
