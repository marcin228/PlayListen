import React, { useState } from "react"
import { PlaylistObject } from "../Playlist/Playlist";
import styles from "../Playlists/Playlists.module.css";
import PlaylistEditor from "../PlaylistEditor/PlaylistEditor.tsx";
import { useGlobalContext } from "../../hooks/useGlobalContext.tsx";

type PlaylistsProps = {
    children?:React.ReactNode,
}

const Playlists:React.FC<PlaylistsProps> = ({ children }) => {

    function onChangeCurrentPlaylistHandler(e:React.ChangeEvent){
    
        const newlySelected = (e.currentTarget as HTMLSelectElement).value;
        setCurrentPlaylistId(parseInt(newlySelected));
    }

    const { state } = useGlobalContext();
    const [currentPlaylistId, setCurrentPlaylistId] = useState(0);

    return (
    <>
        <select name="playlists" id="playlists" className={styles.select} onChange={onChangeCurrentPlaylistHandler}>
            {
                (state.playlists as Array<PlaylistObject>).map((item) => <option key={item.id} value={item.id}>{item.title}</option>)
            }
        </select>

        <PlaylistEditor playlist={state.playlists![currentPlaylistId]} />
        { children }
    </>
    );
};

export default Playlists;