// import React from 'react'
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { setAudio, setSongIndex, setTracklist } from '../../../redux/features/userSlice';
import { useNavigate } from "react-router";
import { setArtistName } from "../../../redux/features/artistSlice"; 

const SongCard = (props: {
    song: any,
    index: number,
    onClick: Function
}) => {
    const dispatch = useDispatch()
    const { audio } = useSelector((state: any) => state.user)
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(setAudio(props.song))
        dispatch(setSongIndex(props.index))
        // let song = document.getElementById('audioplayer') as HTMLAudioElement
        // const a: HTMLAudioElement = song!;
        // console.log(`url(${audio?.img})`)
        // const storage = getStorage();
        // const audRef = ref(storage, `${props.song.audsrc}` + ".mp3");
        // console.log(audRef)
        // getDownloadURL(audRef).then((url: string) =>{
        //     a.pause()
        //     a.src = url;
        //     a.play()
        // })
        // a.pause()
        // a.src = audio?.location
        // a.play()
    }

    const handleArtistClick = async (a: any) => {
        console.log(a)
        dispatch(setArtistName(a))
        // dispatch(setArtistName(a))
        // navigate(`/artists/${"@" + a.split(" ").join("")}`)
        navigate(`/artists/${"@" + a.split(" ").join("")}`)
    }

    return (
        <div className="songCard" onClick={()=>{
            props.onClick()
        }}>
            <div className="thumb">
                <img src={props.song.img} height="100%" width="100%" alt="" onClick={() => {
                    handleClick()
                }} />
            </div>

            <div className="songdetails">
                <div className="musicname">
                    {props.song?.name}
                </div>
                <div className="artists">
                    {
                        props.song?.artist?.map((artist: any) => {
                            return <div className="artistname" key={artist} onClick={() => handleArtistClick(artist)}>
                                {artist}
                            </div>
                        }).reduce((prev: string, curr: string) => [prev, ', ', curr])
                    }

                </div>
            </div>

        </div>
    )
}

export default SongCard
