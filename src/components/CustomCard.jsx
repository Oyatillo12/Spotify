import React, { useContext, useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT_ID } from '../hooks/useEnv'
import { Context } from '../context/Context'

function CustomCard({ onClick, item }) {
    const { token } = useContext(Context)
    const [tracks, setTracks] = useState([])


    useEffect(() => {
        if (!token) return;
        spotifyApi.setAccessToken(token)
    }, [token])

    const spotifyApi = new SpotifyWebApi({
        clientId: CLIENT_ID
    })

    useEffect(() => {
        if (token) {
            spotifyApi.searchTracks(item.searchTrack).then(res => {
                setTracks(res.body.tracks.items.map(item => {
                    const data = {
                        id: item.id,
                        name: item.name,
                        img: item.album.images[0].url,
                        artist: item.artists[0].name,
                        album: item.album.name,
                        uri: item.uri
                    }
                    return data
                }))
            })
        }
    }, [token])
    return (
        <div>
            <h2 className='text-white text-[25px] font-bold mb-4'>{item.title}</h2>
            <div className='flex items-center space-x-6 overflow-x-auto rounded-lg'>
                {tracks.map(item => (
                    <div onClick={() => onClick(item.uri)} key={item.id} className='min-w-[250px] cursor-pointer rounded-lg  overflow-hidden bg-black'>
                        <img className='w-[250px]  h-[250px] object-cover' src={item.img} alt="Music img" />
                        <div className='p-6'>
                            <h3 className='text-white text-[18px] mb-2 line-clamp-1'>{item.name}</h3>
                            <p className='text-white text-[16px] opacity-80'>Artist: {item.artist}</p>
                            <p className='text-white line-clamp-1 text-[16px] opacity-80'>Album: {item.album}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomCard
