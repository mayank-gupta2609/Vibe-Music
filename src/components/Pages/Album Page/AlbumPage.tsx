import React from 'react'
import './Albumpage.css'
import { useDispatch } from 'react-redux'
import { setAudio, setSongIndex, setSongsList } from '../../../redux/features/userSlice'
import { useLocation } from 'react-router'

const AlbumPage = () => {

    const dispatch = useDispatch()
    const [albuminfo, setAlbumInfo] = React.useState<any>([])
    const location = useLocation()
    console.log(window.location.href.split("/")[4])
    const getAlbumInfo = async () => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }

        let response = await fetch(`http://localhost:5000/api/albums/getalbums/${window.location.href.split("/")[4]}`, {
            method: "GET",
            headers: headersList
        });
 
        let data = await response.json();
       
        document.getElementById("albumbackground")?.style.setProperty("--url", `url(${data?.album__?.img})`)
        setAlbumInfo(data)
        console.log(data.album__.img);
    }

    React.useEffect(() => {
        getAlbumInfo()
    }, [])


    return (
        <div className="album-page"> 
            <div className="albuminfo" >
                <div className="albumbackground" id="albumbackground">

                </div>
                <div className="albuminfoholder">

                    <img src={albuminfo?.album__?.img} width="100%" alt="" />

                    <div className="albuminfodetails">
                        <div className="albuminfoname">
                            {albuminfo?.album__?.name}
                        </div>
                        <div className="albuminfocount">
                            {albuminfo?.songs?.length} songs
                        </div>
                    </div>
                </div>
            </div>

            <div className="albumcontent">
                {
                    albuminfo?.songs?.map((song: any, index: number) => {
                        return <div key={song._id} className='albummusicitem' onClick={() => {
                            dispatch(setSongIndex(index))
                            dispatch(setSongsList(albuminfo?.songs))
                            dispatch(setAudio(song))
                        }}>
                            <img src={song.img} alt="" height="100%" />
                            <div className="albummusicitemname">{song.name}</div>
                        </div>
                    })
                }
            </div>



        </div>
    )
}

export default AlbumPage
