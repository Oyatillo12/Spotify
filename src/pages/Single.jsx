import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT_ID } from '../hooks/useEnv'
import { Context } from '../context/Context'
import { ArrowIcon, LikeIcon, MoreIcon, SaveIcon, SearchIcon, TableLikeIcon, TimeIcon } from '../assets/images/icon'
import TracksRow from '../components/TracksRow';
import FilterIcon from '../assets/images/filter.png'
import { useDispatch } from 'react-redux'
import { likePost } from '../store/LikeSlice'

function Single() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const { token, setUri, setPlayer, player } = useContext(Context)
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID
  })
  const [artistTracks, setArtistTracks] = useState([])
  const [track, setTrack] = useState(null)
  const [text, setText] = useState("Filter by music name")

  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token)
  }, [token])

  useEffect(() => {
    if (!id) return;
    async function fetchTrackAndArtists() {
      try {
        const response = await spotifyApi.getTrack(id);
        const trackData = {
          id: response.body.id,
          name: response.body.name,
          artist: response.body.artists[0].name,
          album: response.body.album.name,
          image: response.body.album.images[0].url,
          uri: response.body.uri,
          isLiked: false,
          isPlaying: false,
          artistId: response.body.artists[0].id,
          time: String(((response.body.duration_ms / 1000) / 60).toFixed(2)).split(".").join(":")
        };
        setTrack(trackData)

        const res = await spotifyApi.searchTracks(trackData.artist);
        const artistsTraksData = res.body.tracks.items.map(item => {
          return {
            id: item.id,
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            image: item.album.images[0].url,
            uri: item.uri,
            isLiked: false,
            isPlaying: item.id === trackData.id,
            time: String(((item.duration_ms / 1000) / 60).toFixed(2)).split(".").join(":")
          };
        });

        setArtistTracks(artistsTraksData)
      } catch (error) {
        console.log("error chikdi artist tracks yoki trackda", error);
      }
      false
    }
    fetchTrackAndArtists()

  }, [token, id])
  function handleClick(item, evt) {
    if (evt.target.id == 'like') {
      item.isLiked = !item.isLiked
      setArtistTracks([...artistTracks])
    }
    else {
      artistTracks.filter(item => item.isPlaying = false)
      setPlayer(true)
      setUri(item.uri)
      item.isPlaying = !item.isPlaying
      setArtistTracks([...artistTracks])
    }
  }

  function handleClickPlay() {
    if (player) {
      setPlayer(false)
    }
    else {
      setPlayer(true)
    }
  }

  function handleFilter() {
    setArtistTracks(artistTracks.sort((a, b) => a.name > b.name ? 1 : -1));
    setTimeout(() => {
      setText('Filtered tracks')
    }, 200)
  }

  function handleClickLike() {
    setTrack({ ...track, isLiked: !track.isLiked })
    if (track.isLiked) {
      dispatch(likePost(track))
    }
  }

  return (
    <div className={`${artistTracks?.length || track ? "" : 'h-[100vh]'} pb-[100px]`} style={{ background: ' linear-gradient(180deg, #DEF628 0.09%, #121212 20.28%)' }}>
      <div className='flex items-center bg-[#DDF628] space-x-[22px] pl-10 py-5'>
        <button onClick={() => navigate(-1)} className='bg-[#00000050] w-[40px] h-[40px] flex items-center justify-center rounded-full'><ArrowIcon /></button>
        <button className='bg-[#00000050] w-[40px] h-[40px] flex items-center justify-center rounded-full rotate-180'><ArrowIcon /></button>
      </div>
      {track || artistTracks?.length ?
        <div>
          <div className='h- px-[41px] pt-[28px]' >
            <div className='flex items-center space-x-8'>
              <img className='w-[297px] h-[297px] object-cover rounded-lg' src={track?.image} alt='Music img' width={297} height={297} />
              <div>
                <span className='text-[16px] leading-5 text-white font-medium'>PUBLIC PLAYLIST</span>
                <h2 className='text-[70px] mb-4 leading-[80px] text-white font-black tracking-[-6%]'>{track?.name}</h2>
                <strong className='text-white text-[20px] font-medium opacity-80'>{track?.artist}</strong>
                <p className='text-white text-[18px] opacity-80'>{track?.album}</p>
              </div>

            </div>
            <div className='mt-[60px] flex items-center justify-between mb-[30px]'>
              <div className='flex items-center space-x-8'>
                <button onClick={handleClickPlay} className='w-[72px] h-[72px] rounded-full bg-[#65D36E] flex items-center justify-center'><span className={`${player ? "paused" : ""} play-span  scale-[0.5]  `}></span></button>
                <button onClick={handleClickLike} className={` ${track.isLiked ? "text-[#63CF6C]" : "text-white"}`}><LikeIcon /></button>
                <button className='w-[38px] h-[38px] rounded-full border-2 border-white flex items-center justify-center'><SaveIcon /></button>
                <button><MoreIcon /></button>
              </div>
              <label className=' text-white space-x-8  relative'>
                <button onClick={handleFilter} onMouseLeave={() => setOpen(false)} onMouseEnter={() => setOpen(true)} className='p-2 hover:opacity-70 duration-300 bg-[#f2f3f3] rounded-lg'><img src={FilterIcon} alt="filter icon" width={30} /></button>
                {open ? <p className='absolute left-[-150px] top-[-42px] text-[16px]  text-[#B3B3B3] bg-black rounded-lg p-2'>{text}</p> : null}
              </label>
            </div>

            <table className='w-full'>
              <thead >
                <tr className='border-b-[1px] border-[#666666] '>
                  <th className='text-[16px] text-[#B3B3B3] font-medium py-[14px]'>#</th>
                  <th className='text-[16px] text-[#B3B3B3] text-start font-medium py-[14px]'>TITLE</th>
                  <th className='text-[16px] text-[#B3B3B3] text-start font-medium py-[14px]'>ALBUM</th>
                  <th className='text-[16px] text-[#B3B3B3] font-medium py-[14px] text-center'>DATE ADDED</th>
                  <th className='py-[14px] flex justify-end'><TimeIcon /></th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {artistTracks?.map((item, index) => <TracksRow handleClick={handleClick} index={index} key={item.id} item={item} />)}
              </tbody>
            </table>
          </div>

        </div> : <span className='loader absolute inset-0 m-auto'></span>}
    </div>
  )
}

export default Single
