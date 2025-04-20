
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


    /**
     * 
     * @returns {string}
     */
    generateDownloadString(){
        const result = ['szerzo;mufaj;cim']
        for(const alkotas of this.#array){
            result.push(`${alkotas.szerzo};${alkotas.mufaj};${alkotas.cim}`);
        }
        return result.join('\n');
    }
}