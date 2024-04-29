import React from "react"
import PlaylistEditor from "../PlaylistEditor/PlaylistEditor.tsx";
import { useGlobalContext } from "../../hooks/useGlobalContext.tsx";
import Positionable from "../../classes/Positionable.ts";
import DispatchActionFactory from "../../classes/ActionCreator.ts";
import { useParams } from "react-router-dom";
import PlaylistObject from "../../classes/PlaylistObject.ts";
import PlaylistItemObject from "../../classes/PlaylistItemObject.ts";

export type AddedPlaylist = {

    type: 'playlist',
    title: string
}

export type AddedPlaylistItem = {

    type: 'playlistItem',
    item: PlaylistItemObject,
    playlistId: number
}

export type AddedItem = AddedPlaylist | AddedPlaylistItem;

type PlaylistsProps = {

    children?:React.ReactNode
}

export type PlaylistEditable = {

    root:PlaylistObject | null,
    items:Array<Positionable>,
    addItem(item:AddedItem):void,
    removeItem(e?:React.MouseEvent):void
};

const Playlists:React.FC<PlaylistsProps> = ({ children }) => {

    const { state, dispatch } = useGlobalContext();
    const { id } = useParams();
    let playlist:PlaylistEditable | null = null;

    if(id){

        const addItem = function(item:AddedPlaylistItem){
                
            dispatch(DispatchActionFactory.addPlaylistItem(item.item, parseInt(id)));
        }

        const removeItem = function(){

            //const itemPosition:number = parseInt((e.currentTarget as HTMLElement).dataset['position']!);
            //const itemPlaylistId:number = parseInt((e.currentTarget as HTMLElement).dataset['playlistid']!);
            //dispatch(DispatchActionFactory.removePlaylistItem(itemPlaylistId, itemPosition));
        }

        playlist = {

            root: state.playlists![parseInt(id)],
            items: state.playlists![parseInt(id)].items,
            addItem: addItem,
            removeItem: removeItem
        }
    }
    else{

        const addItem = function(item:AddedPlaylist){
    
            //const newEntry = new PlaylistItemObject(state.playlists![0].items.length, 'newlyAddedItem', 'H_aVaMbf8Dg', false);
            dispatch(DispatchActionFactory.addPlaylist(item.title, state.playlists!.length));
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
        <PlaylistEditor playlist={playlist!} playlistId={id} />
        { children }
    </>
    );
};

export default Playlists;