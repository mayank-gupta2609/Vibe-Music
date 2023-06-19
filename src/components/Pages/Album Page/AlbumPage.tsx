import React from 'react' 

const AlbumPage = () => {
  return (
    <div className="playlist-container">
    <div className="playlistheader">
        <img src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj" height="100%" alt="" />

        <div className="playlistheaderdetails">
            <div className="playlistheadername">
                Album name
            </div>
            <div className="playlistheadercount">
                12 Songs
            </div>
        </div>
    </div>

    <div className="playlistinforow">
        <div className="playlistinfoserialno">#</div>
        <div className="playlistinfoname">Name</div>
        <div className="playlistinfoduration">Duration</div>
    </div>


    <div className="playlistsongdetail">
        <div className="playlistinfoserialno">1</div>
        <div className="playlistinfoname">Music 1 name</div>
        <div className="playlistinfoduration">4:44</div>
    </div>
    <div className="playlistsongdetail">
        <div className="playlistinfoserialno">1</div>
        <div className="playlistinfoname">Music 1 name</div>
        <div className="playlistinfoduration">4:44</div>
    </div>


</div>
  )
}

export default AlbumPage
