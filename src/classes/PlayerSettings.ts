import LocalStorageUtility from "../utils/LocalStorageUtility";

export type PlayerQuality = 'small' | 'medium' | 'large' | 'hd720' | 'hd1080' | 'highres' | 'default';

export default class PlayerSettings{

    public playlistLoop:boolean
    public playerAutoplay:boolean
    public playerDefaultQuality:PlayerQuality

    constructor(playlistLoop:boolean = true, playerAutoplay:boolean = true, playerDefaultQuality:PlayerQuality = 'default'){

        const settings:object | null = LocalStorageUtility.readJSONParsed('settings');

        if(settings !== null){
        
            this.playlistLoop = (settings as unknown as PlayerSettings).playlistLoop;
            this.playerAutoplay = (settings as unknown as PlayerSettings).playerAutoplay;
            this.playerDefaultQuality = (settings as unknown as PlayerSettings).playerDefaultQuality;
        }
        else{
            
            this.playlistLoop = playlistLoop;
            this.playerAutoplay = playerAutoplay;
            this.playerDefaultQuality = playerDefaultQuality;
        }
    }
}