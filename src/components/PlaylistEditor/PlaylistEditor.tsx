import React from "react"
import styles from "../PlaylistEditor/PlaylistEditor.module.css";
import Positionable from "../../classes/Positionable";
import { PlaylistEditable } from "../Playlists/Playlists";
import { useNavigate } from "react-router-dom";
import PlaylistObject from "../../classes/PlaylistObject";
import PlaylistAdder from "../PlaylistAdder/PlaylistAdder";
import DispatchActionFactory from "../../classes/ActionCreator";
import { useGlobalContext } from "../../hooks/useGlobalContext";

type PlaylistEditorProps = {

    playlist:PlaylistEditable,
    playlistId:string | undefined,
    children?:React.ReactNode,
}

const PlaylistEditor:React.FC<PlaylistEditorProps> = ({ playlist, playlistId, children }) => {

    const items:Array<Positionable> = playlist.items;
    const navigate = useNavigate();
    const { dispatch } = useGlobalContext();
    
    const onClickTitleHandler = function(e:React.MouseEvent){

        navigate(''+(e.currentTarget as HTMLElement).dataset['id']!);
    }

    const onClickPositionChangeHandler = function(e:React.MouseEvent){

        const htmlData:DOMStringMap = (e.currentTarget as HTMLElement).dataset;

        console.log(htmlData)

        if(htmlData.direction === 'up'){

            dispatch(DispatchActionFactory.moveItemUp(parseInt(htmlData.position!), parseInt(htmlData.playlistid!)));
        }
        else{

            dispatch(DispatchActionFactory.moveItemDown(parseInt(htmlData.position!), parseInt(htmlData.playlistid!)));
        }
    }
    
    if(!Array.isArray(items))
        return (<></>);

    return (
    <div className={styles.playlists}>

        <PlaylistAdder playlist={playlist} playlistId={playlistId}></PlaylistAdder>

        { items && items.map(item => <div key={ item.position } className={ styles.item }>
                <div className={`${styles.itemTitle} ${((item as PlaylistObject).id !== undefined) ? styles.itemTitleCursor : ''}`}
                 {...(((item as PlaylistObject).id !== undefined) && { onClick: onClickTitleHandler })} 
                 data-id={(item as PlaylistObject).id}>{item.title}</div>
                
                <div className={ styles.itemDelete } data-position={item.position} data-playlistid={playlist.root?.id} onClick={playlist.removeItem}>DELETE</div>
                
                <div className={ styles.itemUp } data-direction={"up"} data-position={item.position}
                data-playlistid={(playlistId) ? playlistId : (item as PlaylistObject).id} 
                onClick={ onClickPositionChangeHandler }>UP</div>
                
                <div className={ styles.itemDown } data-direction={"down"} data-position={item.position}
                data-playlistid={(playlistId) ? playlistId : (item as PlaylistObject).id} 
                onClick={ onClickPositionChangeHandler }>DOWN</div>
            </div>
        ) }

        { children }
    </div>
    );
};

export default PlaylistEditor;