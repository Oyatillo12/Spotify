import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import { useNavigate } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT_ID } from '../../hooks/useEnv'

const CustomCard = lazy(() => new Promise(resolve => {
  return setTimeout(() => resolve(import('../../components/CustomCard')), 1400)
}))

function Home() {
  const { token, setUri, setPlayer } = useContext(Context)
  const navigate = useNavigate()
  const musicList = [
    {
      id: 1,
      searchTrack: 'top tracks on uzb',
      title: 'Top tracks',
    },
    {
      id: 2,
      searchTrack: '2Pac',
      title: '2Pac musics'
    },
    {
      id: 3,
      searchTrack: "Tohir sodiqov",
      title: 'Tohir Sodicov musics'
    },
    {
      id: 4,
      searchTrack: 'Via marokand',
      title: 'Dance music'
    }
  ]
  const [trendMusics, setTrendMusics] = useState([])
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID
  })
  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token)
}, [token])

useEffect(() => {
  if(token) {
    spotifyApi.searchTracks('top tracks').then(res => {
      setTrendMusics(res.body.tracks.items.slice(0, 6).map(item => {
        return {
          id: item.id,
          name: item.name,
          img:item.album.images[0].url,
          uri: item.uri
        }
      }))
    })
  }
}, [token])

  function handlePlayMusic(item) {
    setUri(item.uri)
    setPlayer(true)
    navigate(`/single/${item.id}`)
  }




  return (
    <div className='pb-[100px] login-wrapper h-[100vh] p-8  overflow-y-auto'>
      <h2 className='text-[39px] mb-[29px] text-white leading-[49px] font-bold'>Good afternoon</h2>
      <ul className='flex flex-wrap gap-4 mb-[50px] items-center justify-between'>
        {trendMusics.map(item => (
          <li onClick={() => handlePlayMusic(item)} key={item.id} className='flex w-[48%] cursor-pointer music-list items-center space-x-5 rounded-[6px] overflow-hidden'>
            <img className='h-[82px] w-[82px] object-cover' src={item.img} alt="Music img" width={82} height={82} />
            <h3 className='text-white text-[20px] leading-[25px]'>{item.name}</h3>
          </li>
        ))}
      </ul>
      <div className=' space-y-16'>
        <Suspense fallback={<span className="loader"></span>}>
          {token ? musicList.map(item => <CustomCard key={item.id} item={item} onClick={handlePlayMusic} />) : <span className="loader"></span>}
        </Suspense>
      </div>
    </div>
  )
}

export default Home
