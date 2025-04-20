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

class Form extends Area {
    /**
     * 
     * @param {string} nameOfTheClass 
     */
    constructor(nameOfTheClass){
        super(nameOfTheClass);    
        const form = document.createElement('form');
        this.div.appendChild(form);
 
        const elementsOfField = [{
            fieldid: 'szerzo',
            fieldLabel: 'Szerző'
        },
        {
            fieldid: 'mufaj',
            fieldLabel: 'Műfaj'
        },
        {
            fieldid: 'cim',
            fieldLabel: 'Cím'
        }]
 
        for(const element of elementsOfField){
 
            const fieldDiv = divmaker('field');
            form.appendChild(fieldDiv);

            const label = document.createElement('label');
            label.htmlFor = element.fieldid;
            label.textContent = element.fieldLabel;
            fieldDiv.appendChild(label)
 
            const input = document.createElement('input');
            input.id = element.fieldid;
            fieldDiv.appendChild(document.createElement('br'))
            fieldDiv.appendChild(input);
        }
 
        const button = document.createElement('button');
        button.textContent = 'Hozzáadás';
        form.appendChild(button)
    }
}