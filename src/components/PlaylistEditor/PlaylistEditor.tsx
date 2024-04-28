import React from "react"
import styles from "../PlaylistEditor/PlaylistEditor.module.css";
import Positionable from "../../classes/Positionable";
import { PlaylistEditable } from "../Playlists/Playlists";
import { useNavigate } from "react-router-dom";
import PlaylistObject from "../../classes/PlaylistObject";

type PlaylistEditorProps = {

    playlist:PlaylistEditable,
    children?:React.ReactNode,
}

const PlaylistEditor:React.FC<PlaylistEditorProps> = ({ playlist, children }) => {

    const items:Array<Positionable> = playlist.items;
    const navigate = useNavigate();
    
    const onClickTitleHandler = function(e:React.MouseEvent){

        navigate(''+(e.currentTarget as HTMLElement).dataset['id']!);
    }

    /* const { state, dispatch } = useGlobalContext();

    const newEntryTitle = useRef<HTMLInputElement>(null);
    const newEntryVideoId = useRef<HTMLInputElement>(null); */

    


/*     <div className={`${styles.item} ${styles.edit}`}>
                <div className={styles.itemTitle}>
                    <input ref={newEntryTitle} id="entryTitle" type="text" name="title" placeholder="playlist entry title" className={`${styles.inputText} ${styles.inputTextTitle}`} />
                    <input ref={newEntryVideoId} id="entryVideoId" type="text" name="video" placeholder="video id" className={`${styles.inputText} ${styles.inputTextVideo}`} />
                </div>
                <div className={styles.itemAdd} onClick={onClickAddHandler}>ADD</div>
                <div className={styles.itemUp}></div>
                <div className={styles.itemDown}></div>
        </div> */

    return (
    <>
        
        { items.map(item => <div key={item.position} className={styles.item}>
                <div className={styles.itemTitle} {...(((item as PlaylistObject).id !== undefined) && { onClick: onClickTitleHandler })} data-id={(item as PlaylistObject).id}>{item.title}</div>
                <div className={styles.itemDelete} data-position={item.position} onClick={playlist.removeItem}>DELETE</div>
                <div className={styles.itemUp}>UP</div>
                <div className={styles.itemDown}>DOWN</div>
            </div>
        ) }

        { children }
    </>
    );
};

export default PlaylistEditor;