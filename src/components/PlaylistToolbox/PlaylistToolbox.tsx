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
import { useAnimate } from "framer-motion";
import PlaylistToolboxButton from "../PlaylistToolboxButton/PlaylistToolboxButton";

type PlaylistToolboxProps = {
    children?:React.ReactNode,
}

const PlaylistToolbox:React.FC<PlaylistToolboxProps> = ({ children }) => {

    //const { playlistItemsCount } = usePlaylistContext();
    const { state, dispatch } = useGlobalContext();
    const navigate = useNavigate();
    const [ scope, animate ] = useAnimate();

    function onClickEditHandler():void{

        navigate('/playlists/' + state.currentPlaylistId);
    }

    function onClickShareHandler():void{

        animate(scope.current, { opacity: [1,1,0] },
        { type:"decay", duration: 1})
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
        
        listsRendered = (<select className={styles.select} defaultValue={ state.currentPlaylistId } 
        onChange={onChangeSelectPlaylist}>
                        {
                            lists.map((item) => <option key={item.id} value={item.id} >{item.title}</option>)
                        }
                        </select>);
    }

    return (
    <>
        <div className={`${styles.controls} ${styles.controlsPosition}`}>
            <div className={styles.control}>
                <PlaylistToolboxButton className="playlistSvg" src={PlaylistSvg}>{listsRendered}</PlaylistToolboxButton>
            </div>
            <div className={styles.control}>
                <PlaylistToolboxButton className="editSvg" src={EditSvg} onClick={onClickEditHandler}>edit</PlaylistToolboxButton>
            </div>
            <div className={`${styles.control}`}>
                <div className={styles.copiedContainer}>
                    <div className={`${styles.copied}`} ref={scope}>COPIED!</div>
                    <div onClick={onClickShareHandler} >
                        <ReactSVG  src={CopySvg} className="copySvg" />copy as a link
                    </div>
                </div>
            </div>
        </div>
        { children }
    </>
    );
};

export default PlaylistToolbox;