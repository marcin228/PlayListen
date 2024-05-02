import React, { useState } from "react"
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import styles from "./Player.module.css"
import Playlist from "../Playlist/Playlist";
import { useGlobalContext } from "../../hooks/useGlobalContext";
//import LocalStorageUtility from "../../utils/LocalStorageUtility";
import DispatchActionFactory from "../../classes/ActionCreator";
import PlaylistObject from "../../classes/PlaylistObject";

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

        /* const list = {

            title: 'CS playlist',
            id: 0,
            position:0,
            items: [
            {
                position:0,
                title: 'Interview with Senior JS Developer',
                videoId: 'Uo3cL4nrGOk',
                watched: '0'
            },
            {
                position:1,
                title: 'Containerization Strategy',
                videoId: 'iLyBEEkm5e0',
                watched: '0'
            },
            {
                position:2,
                title: 'What is Back Propagation',
                videoId: 'S5AGN9XfPK4',
                watched: '0'
            },
            {
                position:3,
                title: 'GraphQL vs REST: Which is Better for APIs?',
                videoId: 'PTfZcN20fro',
                watched: '0'
            },
            {
                position:4,
                title: 'MySQL vs MongoDB',
                videoId: 'OdgZ0jr4jpM',
                watched: '1'
            },
            {
                position:5,
                title: 'Kubernetes vs. OpenShift',
                videoId: 'ZsOR8RkAOwI',
                watched: '0'
            },
            {
                position:6,
                title: 'Developer Career Advice: Degree vs Bootcamp?',
                videoId: 'tMj681M8mFo',
                watched: '0'
            }
        ]};

        const list2 = {

            title: 'short playlist',
            id: 1,
            position:1,
            items: [
            {
                position:0,
                title: 'Interview with Senior JS Developer',
                videoId: 'Uo3cL4nrGOk',
                watched: '0'
            },
            {
                position:1,
                title: 'Containerization Strategy',
                videoId: 'iLyBEEkm5e0',
                watched: '0'
            },
        ]};

        const arr = [list, list2];
        LocalStorageUtility.writeJSONStringified('playlists', arr); */

        // LocalStorageUtility.deleteAll();
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

    let lists:Array<PlaylistObject> = state.playlists!;
    let listsRendered = null;

    if(lists){

        if(!Array.isArray(lists))
            lists = [];
        
        listsRendered = (<div className={styles.control}>
                        <select className={styles.select} onChange={onChangeSelectPlaylist}>
                        {
                            lists.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)
                        }
                        </select>
                    </div>);
    }
 
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

                    {listsRendered}
                    
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