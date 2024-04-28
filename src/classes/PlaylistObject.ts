import PlaylistItemObject from "./PlaylistItemObject";
import Positionable from "./Positionable";

export default class PlaylistObject extends Positionable{

    public id:string
    public items:Array<PlaylistItemObject>

    constructor(position:number, title:string, id:string, items:Array<PlaylistItemObject>){

        super(title, position);
        this.id = id;
        this.items = items;
    }
}
