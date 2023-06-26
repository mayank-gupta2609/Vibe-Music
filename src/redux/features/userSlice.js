import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    audioState: false,
    audio: null,
    tracklist: null, //ids of music
    switched: 'audio',
    playlists: null, //list of playlists
    activeplaylist: '', //current active playlist
    searchedterm: '',
    songslist: null, //list of songs in that component
    logged_in: false,
    songIndex: 0,
    likedsongs: [],
    liked: 0,
    likeslist:[]
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAudio: (state, action) => {
            state.audio = action.payload
            // state.audioState = true
        },
        setAudioState: (state, action) => {
            state.audioState = action.payload
        },
        setTracklist: (state, action) => {
            state.tracklist = action.payload
        },
        setSongsList: (state, action) => {
            state.songslist = action.payload
        },
        setPlaylist: (state, action) => {
            state.playlists = action.payload
        },
        setActivePlaylist: (state, action) => {
            state.activeplaylist = action.payload
        },
        setLoggedIn: (state, action) => {
            state.logged_in = action.payload
        },
        setSearchTerm: (state, action) => {
            state.searchedterm = action.payload
        },
        setSearcheditems: (state, action) => {
            state.searcheditems = action.payload
        },
        setSongIndex: (state, action) => {
            state.songIndex = action.payload
        },
        setNextSong: (state, action) => {
            state.songIndex = state.songIndex + 1
        },
        setPrevSong: (state, action) => {
            state.songIndex = state.songIndex - 1
        },
        setSwitched: (state, action) => {
            state.switched = action.payload
        },
        setSong: (state, action) => {
            state.song = action.payload
        },
        setTrackPlaying: (state, action) => {
            state.audioState = action.payload
        },
        setVidSrc: (state, action) => {
            state.vidsrc = action.payload
        },
        setUpdated: (state, action) => {
            state.updated = action.payload
        },
        setLikedsongs: (state, action) => {
            state.likedsongs = action.payload
        },
        setLiked: (state, action) => {
            state.liked = state.liked + action.payload
        },
        setLikesList: (state, action) => {
            state.likeslist = action.payload
        }
    }
});

export const { setUser,setAudio, setAudioState, setSongsList, setPlaylist, setActivePlaylist, setLoggedIn, setTracklist, setSongIndex, setNextSong, setPrevSong, setSearchTerm, setSearcheditems, setSwitched, setSong, setTrackPlaying, setVidSrc, setUpdated, setLikedsongs, setLiked, setLikesList } = userSlice.actions;

export default userSlice.reducer;