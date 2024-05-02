import React, { createContext, Dispatch, useReducer } from "react";
import { DispatchAction, DispatchActionRemovePlaylistItem, DispatchActionAddPlaylistItem, DispatchActionChangePlaylist, DispatchActionChangeVideo, DispatchActionAddPlaylist, DispatchActionRemovePlaylist } from "../classes/ActionCreator";
import State from "../classes/State";
import PlaylistObject from "../classes/PlaylistObject";
import PlaylistItemObject from "../classes/PlaylistItemObject";

export type GlobalContextType = {

    state:State,
    dispatch:Dispatch<DispatchAction>
}

type GlobalContextProviderProps = {

    children:React.ReactNode,
}

function reducer(state:State, action:DispatchAction):State{

    if(action.type == 'changeVideo'){
    
        const { payload } = action as DispatchActionChangeVideo;

        return {...state, currentVideoYTId: payload.videoId, currentVideoPlaylistPosition: payload.playlistPosition};
    }
    else if(action.type == 'changePlaylist'){

        const { payload } = action as DispatchActionChangePlaylist;
        
        return { ...state, currentVideoPlaylistPosition:0, currentVideoYTId: state.playlists![payload].items[0].videoId ,currentPlaylistId: payload};
    }
    else if(action.type == 'addPlaylistItem'){

        const { payload } = action as DispatchActionAddPlaylistItem;

        const playlists = structuredClone(state.playlists);
        playlists![payload.playlistId].items.push(payload.item);

        return {...state, playlists};
    }
    else if(action.type == 'removePlaylistItem'){
    
        const { payload } = action as DispatchActionRemovePlaylistItem;
        const playlists = structuredClone(state.playlists) as PlaylistObject[];

        playlists![payload.itemPlaylistId].items.splice(payload.itemPlaylistPosition, 1);
        playlists![payload.itemPlaylistId].items = playlists![payload.itemPlaylistId].items.map((item:PlaylistItemObject, index:number) => {
            item.position = index;
            return item;
        });

        if(playlists![payload.itemPlaylistId].items.length === 0)
            return {...state, currentVideoPlaylistPosition:0, currentVideoYTId: '', playlists};

        return {...state, currentVideoPlaylistPosition:0, currentVideoYTId: playlists![payload.itemPlaylistId].items[0].videoId, playlists }
    }
    else if(action.type == 'addPlaylist'){

        const { payload } = action as DispatchActionAddPlaylist;
        const playlists = structuredClone(state.playlists);

        playlists![payload.playlistPosition] = new PlaylistObject(payload.playlistPosition, payload.playlistTitle, ''+payload.playlistPosition, []);

        return { ...state, playlists};
    }
    else if(action.type == 'removePlaylist'){

        const { payload } = action as DispatchActionRemovePlaylist;
        let playlists = structuredClone(state.playlists);
        playlists!.splice(payload.playlistId, 1);

        playlists = playlists!.map((item:PlaylistObject, index:number) => {
            item.position = index;
            item.id = ''+index;
            return item;
        });

        return {...state, currentPlaylistId: 0, currentVideoPlaylistPosition:0, currentVideoYTId: playlists![0].items[0].videoId, playlists};
    }

    return state;
}

const defaultGlobalContext:GlobalContextType = { state: State.getDefault(), dispatch:()=>{} };
export const GlobalContext = createContext(defaultGlobalContext)

const GlobalContextProvider:React.FC<GlobalContextProviderProps> = ({ children }) => {

    const defaultState:State = State.getDefault();
    const [ state, dispatch ] = useReducer(reducer, defaultState);

    return (

        <GlobalContext.Provider value={{ state, dispatch }}>
            { children }
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;