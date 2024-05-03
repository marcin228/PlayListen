/** @todo change payload to always be an object for consistency and predictability */

import PlaylistItemObject from "./PlaylistItemObject";

export type DispatchActionType = 'changeVideo' | 'changePlaylist' | 'addPlaylistItem';

export type DispatchActionChangeVideo = {

    type: 'changeVideo',
    payload: {
        videoId:string,
        playlistPosition:number
    }
}

export type DispatchActionChangePlaylist = {

    type: 'changePlaylist',
    payload:number
}

export type DispatchActionMoveItemUp = {

    type: 'moveItemUp',
    payload: {
        itemPosition:number,
        playlistId:number
    }
}

export type DispatchActionMoveItemDown = {

    type: 'moveItemDown',
    payload: {
        itemPosition:number,
        playlistId:number
    }
}

export type DispatchActionAddPlaylistItem = {

    type: 'addPlaylistItem',
    payload: {
        item:PlaylistItemObject,
        playlistId:number
    }
}

export type DispatchActionRemovePlaylistItem = {

    type: 'removePlaylistItem',
    payload: {
        itemPlaylistId:number,
        itemPlaylistPosition:number,
    }
}

export type DispatchActionAddPlaylist = {

    type: 'addPlaylist',
    payload: {
        playlistTitle:string,
        playlistPosition:number
    }
}

export type DispatchActionRemovePlaylist = {

    type: 'removePlaylist',
    payload: {
        playlistId:number
    }
}

export type DispatchAction = DispatchActionChangeVideo | DispatchActionChangePlaylist | DispatchActionMoveItemUp | DispatchActionMoveItemDown | DispatchActionAddPlaylistItem | DispatchActionRemovePlaylistItem | DispatchActionAddPlaylist | DispatchActionRemovePlaylist;

export default class DispatchActionFactory{

    static changeVideo(videoId:string, playlistPosition:number):DispatchActionChangeVideo{
    
        return {

            type: 'changeVideo',
            payload: {
                videoId: videoId,
                playlistPosition: playlistPosition
            }
        } as DispatchActionChangeVideo;
    }
    
    static changePlaylist(playlistId:number):DispatchActionChangePlaylist{
    
        return {
        
            type: 'changePlaylist',
            payload: playlistId
        } as DispatchActionChangePlaylist;
    }

    static moveItemUp(itemPosition:number, playlistId:number){
    
        return {

            type: 'moveItemUp',
            payload: {
                itemPosition:itemPosition,
                playlistId:playlistId
            }
        } as DispatchActionMoveItemUp
    }

    static moveItemDown(itemPosition:number, playlistId:number){
    
        return {

            type: 'moveItemDown',
            payload: {
                itemPosition:itemPosition,
                playlistId:playlistId
            }
        } as DispatchActionMoveItemDown
    }

    static addPlaylistItem(item:PlaylistItemObject, playlistId:number):DispatchActionAddPlaylistItem{

        return {

            type: 'addPlaylistItem',
            payload: {
                item: item,
                playlistId: playlistId
            }
        } as DispatchActionAddPlaylistItem
    }

    static removePlaylistItem(itemPlaylistId:number, itemPlaylistPosition:number):DispatchActionRemovePlaylistItem{

        return {

            type: 'removePlaylistItem',
            payload: {
                itemPlaylistId: itemPlaylistId,
                itemPlaylistPosition: itemPlaylistPosition,
            }
        } as DispatchActionRemovePlaylistItem
    }

    static addPlaylist(title:string, playlistPosition:number):DispatchActionAddPlaylist{

        return {

            type: 'addPlaylist',
            payload: {
                playlistTitle:title,
                playlistPosition: playlistPosition
            }
        } as DispatchActionAddPlaylist
    }

    static removePlaylist(playlistId:number):DispatchActionRemovePlaylist{

        return {

            type: 'removePlaylist',
            payload: {
                playlistId: playlistId
            }
        } as DispatchActionRemovePlaylist
    }
}