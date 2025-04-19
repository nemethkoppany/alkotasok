class Area{

    /**
     * @type {HTMLDivElement}
     */
    #div

    /**
     * @returns {HTMLDivElement}
     */
    get div(){
        return this.#div;
    }

    /**
     * 
     * @param {string} nameOfTheClass 
     */
    constructor(nameOfTheClass){
        let containerDiv = document.querySelector(".containeroop");
        if(!containerDiv){
            containerDiv = document.createElement("div");
            containerDiv.className = "containeroop";
            document.body.appendChild(containerDiv);
        }

        this.#div = document.createElement("div");
        this.#div.className = nameOfTheClass;
        containerDiv.appendChild(this.#div);
    }
}

class Table extends Area{
    /**
     * 
     * @param {string} nameOfTheClass 
     */
    constructor(nameOfTheClass){
        super(nameOfTheClass)

        const table = document.createElement('table');
        this.div.appendChild(table);
 

        const thead = document.createElement('thead');
        table.appendChild(thead);

        const tr = document.createElement('tr');
        thead.appendChild(tr);

        const theadCells = ['Szerző', 'műfaj', 'cím'];
        for(const content of theadCells){
            const th = document.createElement('th');
            th.innerText = content;
            tr.appendChild(th);
        }
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }

    
}