import React from "react"
// import styles from "../Playlists/Playlists.module.css";
import PlaylistEditor from "../PlaylistEditor/PlaylistEditor.tsx";
import { useGlobalContext } from "../../hooks/useGlobalContext.tsx";
import Positionable from "../../classes/Positionable.ts";
import PlaylistItemObject from "../../classes/PlaylistItemObject.ts";
import DispatchActionFactory from "../../classes/ActionCreator.ts";
import { useParams } from "react-router-dom";
import PlaylistObject from "../../classes/PlaylistObject.ts";

type PlaylistsProps = {

    children?:React.ReactNode
}

export type PlaylistEditable = {

    root:PlaylistObject | null,
    items:Array<Positionable>,
    addItem():void,
    removeItem():void
};

const Playlists:React.FC<PlaylistsProps> = ({ children }) => {

/*     function onChangeCurrentPlaylistHandler(e:React.ChangeEvent){
    
        const newlySelected = (e.currentTarget as HTMLSelectElement).value;
        setCurrentPlaylistId(parseInt(newlySelected));
    } */

    const { state, dispatch } = useGlobalContext();
    const { id } = useParams();
    let playlist:PlaylistEditable | null = null;

    if(id){

        const addItem = function(){
    
            const newEntry = new PlaylistItemObject(state.playlists![0].items.length, 'newlyAddedItem', 'H_aVaMbf8Dg', false);
            dispatch(DispatchActionFactory.addPlaylistItem(newEntry, parseInt(id)));
        }

        const removeItem = function(){

            const itemPosition:number = 0; //parseInt((e.currentTarget as HTMLElement).dataset['position']!);
            dispatch(DispatchActionFactory.removePlaylistItem(0, itemPosition));
        }

        playlist = {

            root: state.playlists![parseInt(id)],
            items: state.playlists![parseInt(id)].items,
            addItem: addItem,
            removeItem: removeItem
        }
    }
    else{

        const addItem = function(){
    
            //const newEntry = new PlaylistItemObject(state.playlists![0].items.length, 'newlyAddedItem', 'H_aVaMbf8Dg', false);
            //dispatch(DispatchActionFactory.addPlaylistItem(newEntry, parseInt(id)));
        }

        const removeItem = function(){

            //const itemPosition:number = 0; //parseInt((e.currentTarget as HTMLElement).dataset['position']!);
            //dispatch(DispatchActionFactory.removePlaylistItem(0, itemPosition));
        }

        playlist = {
    
            root: null,
            items: state.playlists!,
            addItem: addItem,
            removeItem: removeItem
        }
    }

    return (
    <>
        {/* <select name="playlists" id="playlists" className={styles.select} onChange={onChangeCurrentPlaylistHandler}>
            {
                (state.playlists as Array<Positionable>).map((item, index) => <option key={index} value={item.id}>{item.title}</option>)
            }
        </select> */}

        <PlaylistEditor playlist={playlist!} />
        { children }
    </>
    );
};

export default Playlists;