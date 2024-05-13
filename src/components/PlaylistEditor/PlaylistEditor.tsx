import React from "react"
import styles from "../PlaylistEditor/PlaylistEditor.module.css";
import Positionable from "../../classes/Positionable";
import { PlaylistEditable } from "../Playlists/Playlists";
import { useNavigate } from "react-router-dom";
import PlaylistObject from "../../classes/PlaylistObject";
import PlaylistAdder from "../PlaylistAdder/PlaylistAdder";
import DispatchActionFactory from "../../classes/DispatchActionFactory";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { motion, AnimatePresence, /* useAnimate */ } from "framer-motion";
import DeleteSvg from '../../assets/delete.svg';
import UpSvg from '../../assets/up.svg';
import DownSvg from '../../assets/down.svg';
import { ReactSVG } from "react-svg";

type PlaylistEditorProps = {

    playlist:PlaylistEditable,
    playlistId:string | undefined,
    children?:React.ReactNode,
}

const PlaylistEditor:React.FC<PlaylistEditorProps> = ({ playlist, playlistId, children }) => {

    const items:Array<Positionable> = playlist.items;
    const navigate = useNavigate();
    const { dispatch } = useGlobalContext();
    //const [ scope, animate ] = useAnimate();
    
    const onClickTitleHandler = function(e:React.MouseEvent){

        navigate(''+(e.currentTarget as HTMLElement).dataset['id']!);
    }

    const onClickRemoveHandler = function(e:React.MouseEvent){

        playlist.removeItem(e);
    }

    const onClickPositionChangeHandler = function(e:React.MouseEvent){

        const htmlData:DOMStringMap = (e.currentTarget as HTMLElement).dataset;

        if(htmlData.isplaylist === 'false'){
            if(htmlData.direction === 'up')
                dispatch(DispatchActionFactory.moveItemUp(parseInt(htmlData.position!), parseInt(htmlData.playlistid!)));
            else
                dispatch(DispatchActionFactory.moveItemDown(parseInt(htmlData.position!), parseInt(htmlData.playlistid!)));
        }
        else{
            if(htmlData.direction === 'up')
                dispatch(DispatchActionFactory.movePlaylistUp(parseInt(htmlData.playlistid!)));
            else
                dispatch(DispatchActionFactory.movePlaylistDown(parseInt(htmlData.playlistid!)));
        }
    }
    
    if(!Array.isArray(items))
        return (<></>);

    return (
    
    <motion.div layout className={styles.playlists}>
        <AnimatePresence>
        <PlaylistAdder playlist={playlist} playlistId={playlistId} key="playlistAdder"></PlaylistAdder>
        
        { items && items.map(item => <motion.div initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity: 0}} key={ item.title } className={ styles.item }>
                <div className={`${styles.itemTitle} ${((item as PlaylistObject).id !== undefined) ? styles.itemTitleCursor : ''}`}
                 {...(((item as PlaylistObject).id !== undefined) && { onClick: onClickTitleHandler })} 
                 data-id={(item as PlaylistObject).id}>{(item as PlaylistObject).id} {item.title}</div>
                
                <div data-identifier="itemDelete" className={ styles.itemDelete } data-position={item.position} data-playlistid={playlist.root?.id} onClick={onClickRemoveHandler}>
                    <ReactSVG src={DeleteSvg} className="deleteSvg" />delete
                </div>
                
                <div data-identifier="itemUp" className={ styles.itemUp } data-direction={"up"} data-position={item.position}
                data-playlistid={(playlistId) ? playlistId : (item as PlaylistObject).id} 
                data-isPlaylist={ ((item as PlaylistObject).items !== undefined) }
                onClick={ onClickPositionChangeHandler }>
                    <ReactSVG src={UpSvg} className="upSvg" />up
                </div>
                
                <div data-identifier="itemDown" className={ styles.itemDown } data-direction={"down"} data-position={item.position}
                data-playlistid={(playlistId) ? playlistId : (item as PlaylistObject).id} 
                data-isPlaylist={ ((item as PlaylistObject).items !== undefined) }
                onClick={ onClickPositionChangeHandler }>
                    <ReactSVG src={DownSvg} className="downSvg" />down
                </div>
            </motion.div>
            
        ) }

        { children }
    </AnimatePresence>
    </motion.div>
    
    );
};

export default PlaylistEditor;