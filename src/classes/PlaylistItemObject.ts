import Positionable from "./Positionable";

export default class PlaylistItemObject extends Positionable {

    public videoId:string;
    public watched:boolean;

    static fromObject(object:PlaylistItemObject):PlaylistItemObject {
    
        return new this(object.position, object.title, object.videoId, object.watched);
    }

    constructor(position:number, title:string, videoId:string, watched:boolean){

        super(title, position);
        this.videoId = videoId;
        this.watched = watched;
    }
}