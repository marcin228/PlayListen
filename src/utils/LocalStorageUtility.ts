export default class LocalStorageUtility {

    static read(key:string):string | null{

        try{
    
            return localStorage.getItem(key);
        }
        catch(e){

            console.log('Error occured during read in LocalStorageUtility.');
        }

        return null;
    }

    static readJSONParsed(key:string):object | null{

        try{

            const retrievedData:string | null = localStorage.getItem(key);
            if(retrievedData !== null)
                return JSON.parse(retrievedData);
        }
        catch(e){

            console.log('Error occured during readJSONParsed in LocalStorageUtility.');
        }

        return null;
    }

    static write(key:string, value:string):boolean{

        try{
    
            localStorage.setItem(key, value);
        }
        catch(e){

            console.log('Error occured during write in LocalStorageUtility.');
            return false;
        }

        return true;
    }

    static writeJSONStringified(key:string, value:object):boolean{

        try{
    
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch(e){

            console.log('Error occured during writeJSONStringified in LocalStorageUtility.');
            return false;
        }

        return true;
    }

    static deleteKey(key:string):boolean{
    
        try{

            localStorage.removeItem(key);
        }
        catch(e){
        
            console.log('Error occured during deleteKey in LocalStorageUtility.');
            return false;
        }

        return true;
    }

    static deleteAll():boolean{

        try{
        
            localStorage.clear();
        }
        catch(e){

            console.log('Error occured during deleteAll in LocalStorageUtility.');
            return false;
        }

        return true;
    }
}