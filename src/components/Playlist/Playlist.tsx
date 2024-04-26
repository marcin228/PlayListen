import React from "react"
import { useGlobalContext } from "../../hooks/useGlobalContext";
import styles from "./Playlist.module.css"
import DispatchActionFactory from "../../classes/ActionCreator";
import PlaylistItemObject from "../../classes/PlaylistItemObject";

export type PlaylistObject = {

    title:string,
    id:string,
    items:Array<PlaylistItemObject>
}

type PlaylistProps = {

    children?:React.ReactNode,
}

const Playlist:React.FC<PlaylistProps> = ({ children }) => {

    const { state, dispatch } = useGlobalContext();

    function onPlaylistItemClickHandler(e:React.MouseEvent){

        dispatch(DispatchActionFactory.changeVideo((e.currentTarget as HTMLElement).dataset.item!, parseInt((e.currentTarget as HTMLElement).dataset.position!)))
    }

    function getPlaylistItems(){
        
        const list = state.playlists![state.currentPlaylistId].items;

        function setPlaylistItemStyle(position:number):string{
        
            if(position === state?.currentVideoPlaylistPosition)
                return `${styles.item} ${styles.itemActive}`;

            return styles.item;
        }

        return list.map((item, index) => <div key={item.position} className={setPlaylistItemStyle(item.position)} onClick={onPlaylistItemClickHandler} data-position={index} data-item={item.videoId}>
            <div className={styles.item__title}>
                {index+1}. {item.title}
            </div>
            <div className={styles.details}>
                <div className={styles.details__item}>#{item.videoId}</div>
                { item.watched && <div className={styles.details__item}>UNWATCHED</div> }
            </div>
        </div>)
    }

    return (
        <div className={styles.playlist}>
            { getPlaylistItems() }
            { children }
        </div>
    );
};

export default Playlist;