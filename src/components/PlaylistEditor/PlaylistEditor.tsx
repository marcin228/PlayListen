import React, { useRef } from "react"
import styles from "../PlaylistEditor/PlaylistEditor.module.css";
import Positionable from "../../classes/Positionable";
import { PlaylistEditable } from "../Playlists/Playlists";
import { useNavigate } from "react-router-dom";
import PlaylistObject from "../../classes/PlaylistObject";
import PlaylistAdder from "../PlaylistAdder/PlaylistAdder";
import DispatchActionFactory from "../../classes/DispatchActionFactory";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { motion, AnimatePresence } from "framer-motion";
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
    const { state, dispatch } = useGlobalContext();
    const lastPlaylistId = useRef<null | number>(null); //useState<null | number>(null);
    const lastPlaylistLength = useRef<null | number>(null); //useState<null | number>(null);
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

    const getItemStyles = function(itemPosition:number):string{

        if(playlistId == undefined)
            return styles.item;

        const addingToPlaylistWithId:number = parseInt(playlistId);

        if(itemPosition !== state?.playlists![addingToPlaylistWithId].items.length-1)
            return styles.item;

        if(lastPlaylistId.current == parseInt(playlistId!))
            if(lastPlaylistLength.current == state?.playlists![addingToPlaylistWithId].items.length)
                return styles.item;

        if(lastPlaylistId.current !== null && lastPlaylistLength.current !== null){

            if(lastPlaylistId.current == addingToPlaylistWithId){
                if(lastPlaylistLength.current + 1 == state?.playlists![addingToPlaylistWithId].items.length){
                    
                    lastPlaylistLength.current = state?.playlists![addingToPlaylistWithId].items.length;
                    return `${styles.item} ${styles.item___added}`;
                }
                else{
                    lastPlaylistLength.current = state?.playlists![addingToPlaylistWithId].items.length;
                }
            }
            else{
                lastPlaylistId.current = addingToPlaylistWithId;
                lastPlaylistLength.current = state?.playlists![addingToPlaylistWithId].items.length;
            }
        }
        else{

            console.log('vars unset')
            lastPlaylistId.current = addingToPlaylistWithId;
            lastPlaylistLength.current = state?.playlists![addingToPlaylistWithId].items.length;
        }

        return styles.item;
    }

    if(!Array.isArray(items))
        return (<></>);

    return (
    
    <motion.div className={styles.playlists}>
        <PlaylistAdder playlist={playlist} playlistId={playlistId} key="playlistAdder"></PlaylistAdder>
        <AnimatePresence>
        { items && items.map(item => <motion.div initial={{opacity: 0}} animate={{opacity:1}}
                key={ item.title } className={ getItemStyles(item.position) }>
                <div className={`${styles.itemTitle} ${((item as PlaylistObject).id !== undefined) ? styles.itemTitleCursor : ''}`}
                 {...(((item as PlaylistObject).id !== undefined) && { onClick: onClickTitleHandler })} 
                 data-id={(item as PlaylistObject).id}>{(item as PlaylistObject).id} {item.title}</div>
                
                <div data-identifier="itemDelete" className={ styles.itemDelete } data-position={item.position}
                data-playlistid={playlist.root?.id} onClick={onClickRemoveHandler}>
                    <ReactSVG src={DeleteSvg} className="deleteSvg" />delete
                </div>
                
                <div data-identifier="itemUp" className={ styles.itemUp } data-direction={"up"} data-position={item.position}
                data-playlistid={(playlistId) ? playlistId : (item as PlaylistObject).id} 
                data-isplaylist={ ((item as PlaylistObject).items !== undefined) }
                onClick={ onClickPositionChangeHandler }>
                    <ReactSVG src={UpSvg} className="upSvg" />up
                </div>
                
                <div data-identifier="itemDown" className={ styles.itemDown } data-direction={"down"} data-position={item.position}
                data-playlistid={(playlistId) ? playlistId : (item as PlaylistObject).id} 
                data-isplaylist={ ((item as PlaylistObject).items !== undefined) }
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