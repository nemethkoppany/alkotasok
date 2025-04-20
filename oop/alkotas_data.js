
class AlkotasData {
 
    /**
     * @param {string}
     */
    #szerzo;
 /**
  * @param {string}
  */
    #mufaj;

    /**
     * @param {string}
     */
    #cim;
 
     /**
     * @param {string}
     */
    get szerzo(){
        return this.#szerzo;
    }
 
     /**
     * @param {string}
     */
    get mufaj(){
        return this.#mufaj;
    }
 
     /**
     * @param {string}
     */
    get cim(){
        return this.#cim;
    }

    /**
     * 
     * @param {string} szerzo 
     * @param {string} mufaj 
     * @param {string} cim 
     */
    constructor(szerzo, mufaj, cim){
        this.#szerzo = szerzo;
        this.#mufaj = mufaj;
        this.#cim = cim;
    }
}