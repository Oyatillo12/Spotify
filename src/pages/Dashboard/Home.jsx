import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import SpotifyWebPlayer from 'react-spotify-web-playback'
import CustomCard from '../../components/CustomCard'

function Home() {
  const [player, setPlayer] = useState(false)
  const [uri, setUri] = useState([])
  const { token } = useContext(Context)




  const musicList = [
    {
      id: 1,
      searchTrack: 'top tracks',
      title: 'Top tracks',
    },
    {
      id: 2,
      searchTrack: '2Pac',
      title: '2Pac musics'
    },
    {
      id: 3,
      searchTrack: "Sherali jo'raev",
      title: 'Dance music'
    },
    {
      id: 4,
      searchTrack: 'dance music',
      title: 'Dance music'
    }
  ]


  function handlePlayMusic(uri) {
    setUri(uri)
    setPlayer(true)
  }




  return (
    <>
      <div className='login-wrapper h-[100vh] p-8  overflow-y-auto space-y-16'>
        {token != '' ? musicList.map(item => <CustomCard key={item.id} item={item} onClick={handlePlayMusic} />) : <span class="loader"></span>}
      </div>
      <div className='sticky bottom-0  w-full'>

        <SpotifyWebPlayer
          token={token}
          uris={uri ? [uri] : []}
          play={player}
          callback={(e) => {
            if (e.isPlaying) {
              setPlayer(false)
            }
          }}
        />
      </div>
    </>
  )
}

export default Home
