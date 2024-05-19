import React, { useState } from "react"
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import styles from "./Player.module.css"
import Playlist from "../Playlist/Playlist";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import DispatchActionFactory from "../../classes/DispatchActionFactory";
import PlaylistObject from "../../classes/PlaylistObject";
import Ads from "../Ads/Ads";
//import LocalStorageUtility from "../../utils/LocalStorageUtility";
//import { flushSync } from "react-dom";

type PlayerProps = {

    children?:React.ReactNode,
}

const Player:React.FC<PlayerProps> = ({ children }) => {

    const [ player, setPlayer ] = useState<YouTubePlayer>(null);
    const { state, dispatch } = useGlobalContext();

    function playVideo(){
    
        player.playVideo();
    }

    const YouTubePlayerOptions:object = {

        width: "100%",
        height: "100%",
        borderRadius: "0",
        playerVars: {autoplay: 1}
    };

    const onStateChangeHandler = function(e:YouTubeEvent):void{

        if(e.data === YouTube.PlayerState.ENDED && state !== null){

            const currentPlaylist:PlaylistObject = state.playlists![state.currentPlaylistId];

            if(state.currentVideoPlaylistPosition + 1 >= currentPlaylist.items.length){

                if(state.settings.playlistLoop){
                    dispatch(DispatchActionFactory.changeVideo(currentPlaylist.items.find((item) => item.position === 0)!.videoId, 0));
                }
            }
            else if(state.currentVideoPlaylistPosition < currentPlaylist.items.length){

                dispatch(DispatchActionFactory.changeVideo(currentPlaylist.items.find((item) => item.position == (state.currentVideoPlaylistPosition! + 1))!.videoId, state.currentVideoPlaylistPosition! + 1));
            }
        }

        if(e.data === YouTube.PlayerState.UNSTARTED)
            playVideo();
    }

    const videoReady = (e:YouTubeEvent) => {
       
        setPlayer(() => e.target);
    };
 
    return (
    <>
        <div className={styles.subcontainer}>
            <div className={styles.player}>
                <YouTube
                videoId={state?.currentVideoYTId}
                opts={YouTubePlayerOptions}
                onReady={videoReady}
                onStateChange={onStateChangeHandler}
                className={styles.video}
                />
                <div className={styles.ads}>
                    <Ads />
                </div>
            </div>
            <div className={styles.playlist}>
                <Playlist />
            </div>
        </div>
        { children }
    </>
    );
};

export default Player;