import React from "react"
import styles from "../PlaylistToolbox/PlaylistToolbox.module.css";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import DispatchActionFactory from "../../classes/DispatchActionFactory";
import PlaylistObject from "../../classes/PlaylistObject";
import playlistToClipboard from "../../utils/PlaylistToClipboard";
import { usePlaylistContext } from "../Playlist/Playlist";

type PlaylistToolboxProps = {
    children?:React.ReactNode,
}

const PlaylistToolbox:React.FC<PlaylistToolboxProps> = ({ children }) => {

    const { playlistItemsCount } = usePlaylistContext();
    
    function changeVideo():void{

        //const arr = [list, list2];
        // LocalStorageUtility.writeJSONStringified('playlists', arr); */

        // LocalStorageUtility.deleteAll();

       /*   console.log('TRYING TO REMOVE');
        const woot = state.playlists!.length;
        for(let i = 0; i < 30; i++){

            console.log('playlists number', woot - i)
            flushSync(() => {
                dispatch(DispatchActionFactory.removePlaylist(woot - i));
            });
        } */

        playlistToClipboard(state.playlists![state.currentPlaylistId].title, state.playlists![state.currentPlaylistId].items);
    }


    function onChangeSelectPlaylist(e:React.ChangeEvent){
    
        dispatch(DispatchActionFactory.changePlaylist(parseInt((e.currentTarget as HTMLInputElement).value)));
    }

    const { state, dispatch } = useGlobalContext();

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
        <div>
            {listsRendered}
                    
            <div className={styles.control}>
                <div>PLAY VIEO NOW!</div>
            </div>
            <div className={styles.control}>
                <div onClick={changeVideo}>COPY PLAYLIST ({ playlistItemsCount} ITEMS) TO CLIPBOARD AS SHAREABLE LINK</div>
            </div>
        </div>
        { children }
    </>
    );
};

export default PlaylistToolbox;