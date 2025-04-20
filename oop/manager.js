
class Manager{
 
    /**
     * @type {AlkotasData[]}
     */
    #array;

    /**
     * @type {addAlkotasCallback}
     */
    #addAlkotasCallback;
 
    constructor(){
        this.#array = []
    }
 
    /**
     * 
     * @param {function} callback 
     */
    setAddAlkotasCallback(callback){
        this.#addAlkotasCallback = callback;
    }

    /**
     * 
     * @param {AlkotasData} data 
     */
    addData(data){
        this.#array.push(data);
        this.#addAlkotasCallback(data);
    }
}