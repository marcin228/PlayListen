import React from "react"
import styles from "../PlaylistToolbox/PlaylistToolbox.module.css";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import DispatchActionFactory from "../../classes/DispatchActionFactory";
import PlaylistObject from "../../classes/PlaylistObject";
import playlistToClipboard from "../../utils/PlaylistToClipboard";
//import { usePlaylistContext } from "../Playlist/Playlist";
import { useNavigate } from "react-router-dom";
import EditSvg from '../../assets/pencil.svg';
import CopySvg from '../../assets/copy.svg';
import PlaylistSvg from '../../assets/playlist.svg';
import { ReactSVG } from "react-svg";

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
        
        listsRendered = (<select className={styles.select} onChange={onChangeSelectPlaylist}>
                        {
                            lists.map((item) => <option key={item.id} value={item.id} selected={ state.currentPlaylistId === parseInt(item.id) }>{item.title}</option>)
                        }
                        </select>);
    }

    return (
    <>
        <div className={styles.controls}>
            <div className={styles.control}>
                <ReactSVG src={PlaylistSvg} className="playlistSvg" />{listsRendered}
            </div>
            <div className={styles.control}>
                <div onClick={onClickEditHandler}>
                    <ReactSVG src={EditSvg} className="editSvg" />edit
                </div>
            </div>
            <div className={styles.control}>
                <div onClick={onClickShareHandler}>
                    <ReactSVG  src={CopySvg} className="copySvg" />copy as link
                </div>
            </div>
        </div>
        { children }
    </>
    );
};

export default PlaylistToolbox;