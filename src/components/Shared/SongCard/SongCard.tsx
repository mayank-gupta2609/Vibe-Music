import React from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { setAudio } from '../../../redux/features/userSlice';

const SongCard = (props: {
    song: any
}) => {
    const dispatch = useDispatch()
    const { audio } = useSelector((state:any) => state.user)

    const handleClick = () => {
        dispatch(setAudio(props.song))
        let song = document.getElementById('audioplayer') as HTMLAudioElement
        const a: HTMLAudioElement = song!;
        // const storage = getStorage();
        // const audRef = ref(storage, `${props.song.audsrc}` + ".mp3");
        // console.log(audRef)
        // getDownloadURL(audRef).then((url: string) =>{
        //     a.pause()
        //     a.src = url;
        //     a.play()
        // })
        a.pause()
        a.src = audio?.location
        a.play()
    }

    return (
        <div className="songCard" onClick={() => {
            handleClick()
        }}>
            <div className="thumb">
                <img src={props.song.img} height="100%" width="100%" alt="" />
            </div>

            <div className="songdetails">
                <div className="musicname">
                    {props.song?.name}
                </div>
                <div className="artists">
                    {props.song?.artist?.join(",")}
                </div>
            </div>

        </div>
    )
}

export default SongCard
