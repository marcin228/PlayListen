import PlaylistItemObject from "../classes/PlaylistItemObject";

export default function playlistToClipboard(title:string, items:Array<PlaylistItemObject>):void{

    if(items.length == 0)
        throw new Error('Playlist empty, cannot write shareable link to clipboard.');
    
    let link:string = 'player?linkedPlaylist=' + encodeURIComponent(title);

    const l = items.length;
    for(let i = 0; i < l; i++){
        link += ',';
        link += encodeURIComponent(items[i].title) + ',' + encodeURIComponent(items[i].videoId);
    }
    
    try{
        
        navigator.clipboard.writeText(link);
    }
    catch(e){

        console.log('Error occured in copying playlist to clipboard.')
    }
}