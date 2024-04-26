import React, { useState } from "react"
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import styles from "./Player.module.css"
import Playlist, { PlaylistObject } from "../Playlist/Playlist";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import LocalStorageUtility from "../../utils/LocalStorageUtility";
import DispatchActionFactory from "../../classes/ActionCreator";

type PlayerProps = {

    children?:React.ReactNode,
}

const Player:React.FC<PlayerProps> = ({ children }) => {

    const [ player, setPlayer ] = useState<YouTubePlayer>(null);
    const { state, dispatch } = useGlobalContext();

    function playVideo(){
    
        player.playVideo();
    }

    function changeVideo():void{

        console.log(LocalStorageUtility.readJSONParsed('playlists'));
    }

    const YouTubePlayerOptions:object = {

        width: "100%",
        height: "100%",
        borderRadius: "0",
        playerVars: {},
    };

    const onStateChangeHandler = function(e:YouTubeEvent):void{

        if(e.data === YouTube.PlayerState.ENDED && state !== null){

            const currentPlaylist:PlaylistObject = state.playlists![state.currentPlaylistId];

            if(state.currentVideoPlaylistPosition + 1 >= currentPlaylist.items.length){

                if(state.settings.playlistLoop){
                    dispatch(DispatchActionFactory.changeVideo(currentPlaylist.items.find((item) => item.position === 0)!.videoId, 0));
                    playVideo();
                }
            }
            else if(state.currentVideoPlaylistPosition < currentPlaylist.items.length){

                dispatch(DispatchActionFactory.changeVideo(currentPlaylist.items.find((item) => item.position == (state.currentVideoPlaylistPosition! + 1))!.videoId, state.currentVideoPlaylistPosition! + 1));
                playVideo();
            }
        }

        if(e.data === YouTube.PlayerState.UNSTARTED)
            playVideo();
    }

    function onChangeSelectPlaylist(e:React.ChangeEvent){
    
        dispatch(DispatchActionFactory.changePlaylist(parseInt((e.currentTarget as HTMLInputElement).value)));
    }

    const videoReady = (e:YouTubeEvent) => {
       
        setPlayer(() => e.target);
    };

    const lists:Array<PlaylistObject> = state.playlists!;
 
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
                <div className={styles.controls}>
                    <div className={styles.control}>
                        <select className={styles.select} onChange={onChangeSelectPlaylist}>
                        {
                            lists.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)
                        }
                        </select>
                    </div>
                    <div className={styles.control}>
                        <div onClick={playVideo}>PLAY VIEO NOW!</div>
                    </div>
                    <div className={styles.control}>
                        <div onClick={changeVideo}>CUSTOM TEST ACTION</div>
                    </div>
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