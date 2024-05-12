import React from "react"
import styles from "../PlaylistToolbox/PlaylistToolbox.module.css";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import DispatchActionFactory from "../../classes/DispatchActionFactory";
import PlaylistObject from "../../classes/PlaylistObject";
import playlistToClipboard from "../../utils/PlaylistToClipboard";
//import { usePlaylistContext } from "../Playlist/Playlist";
import { useNavigate } from "react-router-dom";

type PlaylistToolboxProps = {
    children?:React.ReactNode,
}

const PlaylistToolbox:React.FC<PlaylistToolboxProps> = ({ children }) => {

    //const { playlistItemsCount } = usePlaylistContext();
    const { state, dispatch } = useGlobalContext();
    const navigate = useNavigate();

    function onClickEditHandler():void{

        navigate('/playlists/' + state.currentPlaylistId);
    }

    function onClickShareHandler():void{

        playlistToClipboard(state.playlists![state.currentPlaylistId].title, state.playlists![state.currentPlaylistId].items);
    }

    function onChangeSelectPlaylist(e:React.ChangeEvent){
    
        dispatch(DispatchActionFactory.changePlaylist(parseInt((e.currentTarget as HTMLInputElement).value)));
    }

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
        <div className={styles.controls}>
            <div className={styles.control}>
                {listsRendered}
            </div>
            <div className={styles.control}>
                <div onClick={onClickEditHandler}>edit</div>
            </div>
            <div className={styles.control}>
                <div onClick={onClickShareHandler}>share as link</div>
            </div>
        </div>
        { children }
    </>
    );
};

export default PlaylistToolbox;