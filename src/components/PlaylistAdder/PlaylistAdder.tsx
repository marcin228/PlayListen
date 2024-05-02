import React, { useRef } from "react"
import styles from "./PlaylistAdder.module.css"
import { PlaylistEditable } from "../Playlists/Playlists";
import PlaylistItemObject from "../../classes/PlaylistItemObject";
import { useGlobalContext } from "../../hooks/useGlobalContext";

type PlaylistAdderProps = {

    playlist:PlaylistEditable,
    playlistId:string | undefined,
    children?:React.ReactNode,
}

const PlaylistAdder:React.FC<PlaylistAdderProps> = ({ playlist, playlistId, children }) => {

    const newPlaylistTitle = useRef<HTMLInputElement>(null);
    const newPlaylistItemTitle = useRef<HTMLInputElement>(null);
    const newPlaylistItemVideoId = useRef<HTMLInputElement>(null);
    const { state } = useGlobalContext();

    function onClickAddHandler(){
    
        if(playlistId){

            const newItem:PlaylistItemObject = new PlaylistItemObject(state.playlists![parseInt(playlistId)].items.length,newPlaylistItemTitle.current!.value, newPlaylistItemVideoId.current!.value, false);
            playlist.addItem({ type: 'playlistItem', item: newItem, playlistId: parseInt(playlistId)});
        }else{

            playlist.addItem({ type: 'playlist', title: newPlaylistTitle.current!.value});
        }
    }

    return (
    <>
        {!playlistId && <div className={styles.playlistItemAdder}>
            <div className={styles.itemTitle}>
                <input type="text" ref={newPlaylistTitle} placeholder="new playlist name"></input>
            </div>
            <div className={styles.itemAdd} onClick={onClickAddHandler}>ADD</div>
            <div className={styles.itemEmpty} />
            <div className={styles.itemEmpty} />
        </div>}

        {playlistId && <div className={styles.playlistItemAdder}>
            <div className={styles.itemTitle}>
                <input type="text" ref={newPlaylistItemTitle} placeholder="playlist entry title"></input>
                <input type="text" ref={newPlaylistItemVideoId} placeholder="youtube video id"></input>
            </div>
            <div className={styles.itemAdd} onClick={onClickAddHandler}>ADD</div>
            <div className={styles.itemEmpty} />
            <div className={styles.itemEmpty} />
        </div>}

        { children }
    </>
    );
};

export default PlaylistAdder;