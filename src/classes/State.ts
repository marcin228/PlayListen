import PlaylistObject from "./PlaylistObject"
import PlayerSettings from "./PlayerSettings"
import LocalStorageUtility from "../utils/LocalStorageUtility"

export default class State{

    public currentVideoYTId:string
    public currentVideoPlaylistPosition:number
    public currentPlaylistId:number

    public settings:PlayerSettings
    public playlists:Array<PlaylistObject> | null

    constructor(currentVideoYTId:string, currentVideoPlaylistPosition:number, currentPlaylistId:number, settings:PlayerSettings, playlists:Array<PlaylistObject>|null = null){

        this.currentVideoYTId = currentVideoYTId;
        this.currentVideoPlaylistPosition = currentVideoPlaylistPosition;
        this.currentPlaylistId = currentPlaylistId;

        this.settings = settings;
        this.playlists = playlists;

        const pls:object | null = LocalStorageUtility.readJSONParsed('playlists');
        if(pls !== null){
            
            this.playlists = (pls as unknown as PlaylistObject[])
            this.currentPlaylistId = parseInt(this.playlists[0].id);

            try{
                this.currentVideoYTId = this.playlists[0].items[0].videoId;
            }
            catch(e){
                console.log('State, playlists empty.')
            }
            finally{
                this.currentVideoYTId = 'jNQXAC9IVRw';
            }
            this.currentVideoPlaylistPosition = 0;
        }
    }

    static getDefault():State{
    
        return new State('jNQXAC9IVRw', 0, 0, new PlayerSettings());
    }
}