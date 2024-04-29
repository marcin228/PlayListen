import React, { useRef } from "react"
import styles from "./PlaylistAdder.module.css"
import { PlaylistEditable } from "../Playlists/Playlists";
import PlaylistItemObject from "../../classes/PlaylistItemObject";
import { useGlobalContext } from "../../hooks/useGlobalContext";

type PlaylistAdderProps = {

    playlist:PlaylistEditable,
    playlistId:string | undefined,
    children:React.ReactNode,
}

const PlaylistAdder:React.FC<PlaylistAdderProps> = ({ playlist, playlistId, children }) => {

    const newPlaylistTitle = useRef<HTMLInputElement>(null);
    const newPlaylistItemTitle = useRef<HTMLInputElement>(null);
    const newPlaylistItemVideoId = useRef<HTMLInputElement>(null);
    const { state } = useGlobalContext();

    function onClickAddHandler(){ //e:React.MouseEvent){
    
        if(playlistId){

            const newItem:PlaylistItemObject = new PlaylistItemObject(state.playlists![parseInt(playlistId)].items.length,newPlaylistItemTitle.current!.value, newPlaylistItemVideoId.current!.value, false);
            playlist.addItem({ type: 'playlistItem', item: newItem, playlistId: parseInt(playlistId)});
        }else{

            playlist.addItem({ type: 'playlist', title: newPlaylistTitle.current!.value});
        }

        console.log('ADDING!')
    }

    //const { state, dispatch } = useGlobalContext;

    return (
    <>
        {!playlistId && <div className={styles.playlistItemAdder}>
            <div className={styles.itemTitle} onClick={onClickAddHandler}>[ + ] ADD</div>
            <div className={styles.itemTitle}>Play</div>
            <div className={styles.itemTitle}>
                <input type="text" ref={newPlaylistTitle}></input>
            </div>
            <div className={styles.itemTitle}>[ + ] ADD</div>
        </div>}

        {playlistId && <div className={styles.playlistItemAdder}>
            <div className={styles.itemTitle} onClick={onClickAddHandler}>[ + ] ADD</div>
            <div className={styles.itemTitle}>Play</div>
            <div className={styles.itemTitle}>
                <input type="text" ref={newPlaylistItemTitle} placeholder="title"></input>
                <input type="text" ref={newPlaylistItemVideoId} placeholder="vid id"></input>
            </div>
            <div className={styles.itemTitle}>[ + ] ADD</div>
        </div>}

        { children }
    </>
    );
};

export default PlaylistAdder;