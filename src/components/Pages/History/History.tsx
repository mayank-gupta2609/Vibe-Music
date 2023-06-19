import React from 'react'

const History = () => {
    return (
        <div className="playlist-container">
            <div className="playlistheader">
                <i className="fa-solid fa-clock-rotate-left history" ></i>

                <div className="playlistheaderdetails">
                    <div className="playlistheadername">
                        History
                    </div>
                    <div className="playlistheadercount">
                        12 Songs
                    </div>
                </div>
            </div>

            <div className="playlistinforow">
                <div className="playlistinfoserialno">#</div>
                <div className="playlistinfoname">Name</div>
                {/* <div className="playlistinfoduration">Duration</div> */}
            </div>


            <div className="playlistsongdetail">
                <div className="playlistinfoserialno">1</div>
                <div className="playlistinfoname">Music 1 name</div>
                <div className="playlistinfoduration">
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
            <div className="playlistsongdetail">
                <div className="playlistinfoserialno">1</div>
                <div className="playlistinfoname">Music 1 name</div>
                <div className="playlistinfoduration">
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>


        </div>
    )
}

export default History
