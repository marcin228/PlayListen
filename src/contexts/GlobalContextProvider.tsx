import React, { createContext, Dispatch, useReducer } from "react";
import { DispatchAction, DispatchActionRemovePlaylistItem, DispatchActionAddPlaylistItem, DispatchActionChangePlaylist, DispatchActionChangeVideo } from "../classes/ActionCreator";
import State from "../classes/State";

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

        const playlists = structuredClone(state.playlists);

        playlists![payload.itemPlaylistId].items.splice(payload.itemPlaylistPosition, 1);
        playlists![payload.itemPlaylistId].items = playlists![payload.itemPlaylistId].items.map((item, index) => {
            item.position = index;
            return item;
        });

        return {...state, currentVideoPlaylistPosition:0, currentVideoYTId: playlists![payload.itemPlaylistId].items[0].videoId, playlists};
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