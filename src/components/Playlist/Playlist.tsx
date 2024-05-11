import React, { useEffect } from "react"
import { useGlobalContext } from "../../hooks/useGlobalContext";
import styles from "./Playlist.module.css"
import DispatchActionFactory from "../../classes/DispatchActionFactory";
import PlaylistItemObject from "../../classes/PlaylistItemObject";
import { useLocation } from "react-router-dom";
import PlaylistObject from "../../classes/PlaylistObject";

type PlaylistProps = {

    children?:React.ReactNode,
}

const Playlist:React.FC<PlaylistProps> = ({ children }) => {

    const { state, dispatch } = useGlobalContext();
    const location = useLocation();

    { console.log('LOGGIN STATE, WAS IT MOCKED CORRECTLY? =>', state)}
            

    function onPlaylistItemClickHandler(e:React.MouseEvent){

        dispatch(DispatchActionFactory.changeVideo((e.currentTarget as HTMLElement).dataset.item!, parseInt((e.currentTarget as HTMLElement).dataset.position!)))
    }

    function getPlaylistFromLink(playlistInLink:string):void{

        const tmp:Array<string> = playlistInLink.split(',');
        const playlistTitle:string = decodeURIComponent(tmp[0]);
        const playlistPosition:number = state.playlists!.length;
        const playlistItems:Array<PlaylistItemObject> = [];

        if(state.playlists![playlistPosition-1].title == playlistTitle)
            return;

        let ptr:number = 0;
        const l = tmp.length;
        for(let i = 1; i < l; i+=2){
            playlistItems.push(new PlaylistItemObject(ptr, decodeURIComponent(tmp[i]), decodeURIComponent(tmp[i+1]), false))
            ptr++;
        }

        const incomingPlaylist:PlaylistObject = new PlaylistObject(playlistPosition, playlistTitle, ''+playlistPosition, playlistItems);
        dispatch(DispatchActionFactory.addPlaylistFromLink(incomingPlaylist, playlistPosition));
    }

    useEffect(() => {

        console.log('EXEC USE EFFECT oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
        console.log('LOGGING LOC.SEARCH', location.search);
        const searchParams = new URLSearchParams(location.search);

        if(searchParams.has('linkedPlaylist'))
            getPlaylistFromLink(searchParams.get('linkedPlaylist')!);
    });

    function getPlaylistItems(list:Array<PlaylistItemObject>){
        
        if(!list || list.length == 0)
            return <></>;

        function setPlaylistItemStyle(position:number):string{
        
            if(position === state?.currentVideoPlaylistPosition)
                return `${styles.item} ${styles.itemActive}`;

            return styles.item;
        }

        return list.map((item:PlaylistItemObject, index:number) => <div key={item.position} className={setPlaylistItemStyle(item.position)} onClick={onPlaylistItemClickHandler} data-position={index} data-item={item.videoId}>
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
            { getPlaylistItems(state?.playlists![state?.currentPlaylistId].items) }
            { children }
        </div>
    );
};

export default Playlist;