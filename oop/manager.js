
class Manager{
 
    /**
     * @type {AlkotasData[]}
     */
    #array;

    /**
     * @type {function(AlkotasData):void}
     */
    #addAlkotasCallback;

    /**
     * @type {function(AlkotasData[]):void}}
     */
    #renderTableCallback
 
    constructor(){
        this.#array = []
    }
 
    /**
     * 
     * @param {function(AlkotasData):void} callback 
     */
    setAddAlkotasCallback(callback){
        this.#addAlkotasCallback = callback;
    }

     /**
     * 
     * @param {function(AlkotasData[]):void} callback 
     */
    setRenderTableCallback(callback) {
        this.#renderTableCallback = callback;
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

    /**
     * @param {function(AlkotasData):boolean} callback 
     */
    filter(callback){
        const result = [];
        for(const alkotas of this.#array){
            if(callback(alkotas)){
                result.push(alkotas);
            }
        }
        this.#renderTableCallback(result);
    }


    renderOriginal() {
        this.#renderTableCallback(this.#array.slice());
    }

    /**
     * 
     * @param {(alkotas1: AlkotasData, alkotas2: AlkotasData) => number} sorter 
     */
    sort(sorter) {
        const arr = this.#array.slice();
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (sorter(arr[j], arr[j + 1]) > 0) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        this.#renderTableCallback(arr);
    }
}