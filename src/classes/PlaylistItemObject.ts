/* export type PlaylistItemObject = {

    position:number,
    title:string,
    videoId:string,
    watched:string
}

*/

export default class PlaylistItemObject{

    public position:number;
    public title:string;
    public videoId:string;
    public watched:boolean;

    static fromObject(object:PlaylistItemObject):PlaylistItemObject {
        return new this(object.position, object.title, object.videoId, object.watched);
    }

    constructor(position:number, title:string, videoId:string, watched:boolean){

        this.position = position;
        this.title = title;
        this.videoId = videoId;
        this.watched = watched;
    }
}