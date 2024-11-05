import React from 'react'
import { TableLikeIcon,} from '../assets/images/icon'
import PlayingIcon from './PlayingIcon/PlayingIcon'

function TracksRow({item, index, handleClick}) {

    return (
        <tr onClick={(evt) => handleClick(item, evt)} key={item.id}>
            <td className='text-[16px] text-[#B3B3B3] font-medium py-[14px] relative'>{item.isPlaying  ? <PlayingIcon/> : index+1}</td>
            <td className='text-[16px] text-[#B3B3B3] font-medium flex items-center space-x-4 py-[14px] ml-2'>
                <img className='w-[52px] h-[52px] object-cover ' src={item.image} alt="Music img" width={52} height={52} />
                <div className='flex flex-col items-start space-y-[2px] '>
                    <span className={` ${item.isPlaying ? "text-[#63CF6C]" : ""} line-clamp-1 `}>{item.name}</span>
                    <span className='line-clamp-1'>{item.artist}</span>
                </div>
            </td>
            <td className='text-[16px] text-[#B3B3B3] text-start font-medium py-[14px]'>{item.album}</td>
            <td></td>
            <td className='py-[14px] flex items-center relative justify-end'>
                <button id='like' className={`${item.isLiked ? "text-[#63CF6C]" : "text-white"} z-50 absolute left-[-37px] inset-y-0 my-auto`}><TableLikeIcon/></button>
                <span className='text-[16px] text-white tracking-wide font-medium'>{item.time}</span>
            </td>
        </tr>
    )
}

export default TracksRow
