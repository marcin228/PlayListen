import React, { useRef } from "react"
import PlaylistItemObject from "../../classes/PlaylistItemObject";
import { PlaylistObject } from "../Playlist/Playlist";
import styles from "../PlaylistEditor/PlaylistEditor.module.css";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import DispatchActionFactory from "../../classes/ActionCreator";

type PlaylistEditorProps = {

    playlist:PlaylistObject,
    /* getSelectedPlaylistId: (el:HTMLSelectElement) => number, */
    children?:React.ReactNode,
}

const PlaylistEditor:React.FC<PlaylistEditorProps> = ({ playlist, children }) => {

    const items:Array<PlaylistItemObject> = playlist.items;
    
    const { state, dispatch } = useGlobalContext();

    const newEntryTitle = useRef<HTMLInputElement>(null);
    const newEntryVideoId = useRef<HTMLInputElement>(null);

    function onClickAddHandler(){
    
        const newEntry = new PlaylistItemObject(state.playlists![parseInt(playlist.id)].items.length, newEntryTitle.current!.value, newEntryVideoId.current!.value, false);

        dispatch(DispatchActionFactory.addPlaylistItem(newEntry, parseInt(playlist.id)));
    }

    function onClickDeleteHandler(e:React.MouseEvent){

        const itemPosition:number = parseInt((e.currentTarget as HTMLElement).dataset['position']!);
        dispatch(DispatchActionFactory.removePlaylistItem(parseInt(playlist.id), itemPosition));
    }

    return (
    <>
        <div className={`${styles.item} ${styles.edit}`}>
                <div className={styles.itemTitle}>
                    <input ref={newEntryTitle} id="entryTitle" type="text" name="title" placeholder="playlist entry title" className={`${styles.inputText} ${styles.inputTextTitle}`} />
                    <input ref={newEntryVideoId} id="entryVideoId" type="text" name="video" placeholder="video id" className={`${styles.inputText} ${styles.inputTextVideo}`} />
                </div>
                <div className={styles.itemAdd} onClick={onClickAddHandler}>ADD</div>
                <div className={styles.itemUp}></div>
                <div className={styles.itemDown}></div>
        </div>
        { items.map(item => <div key={item.position} className={styles.item}>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemDelete} data-position={item.position} onClick={onClickDeleteHandler}>DELETE</div>
                <div className={styles.itemUp}>UP</div>
                <div className={styles.itemDown}>DOWN</div>
            </div>
        ) }

        { children }
    </>
    );
};

export default PlaylistEditor;