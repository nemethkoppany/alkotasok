class Area{

    /**
     * @type {HTMLDivElement}
     */
    #div

    /**
     * @type {Manager}
     */
    #manager

    /**
     * @returns {Manager}
     */
    get manager(){
        return this.#manager;
    }
    /**
     * @returns {HTMLDivElement}
     */
    get div(){
        return this.#div;
    }

    /**
     * 
     * @param {string} nameOfTheClass 
     * @param {Manager} manager
     */
    constructor(nameOfTheClass, manager){
        this.#manager = manager;
        const container = this.#getDivForContainer();
        this.#div = document.createElement('div');
        this.#div.className = nameOfTheClass;
        container.appendChild(this.#div);
    }
    /**
     * 
     * @returns {HTMLDivElement}
     */
    #getDivForContainer(){
        let containerDiv = document.querySelector('.containeroop');
        if(!containerDiv){
            containerDiv = document.createElement('div');
            containerDiv.className = 'containeroop';
            document.body.appendChild(containerDiv);
        }
        return containerDiv;
    }
}

class Table extends Area{
    /**
     * 
     * @param {string} nameOfTheClass 
     * @param {Manager} manager
     */
    constructor(nameOfTheClass, manager){
        super(nameOfTheClass, manager)
        const tbody = this.#tableCreation();
        this.manager.setAddAlkotasCallback((data) => {
            const tr = document.createElement('tr');
 
            const szerzo = document.createElement('td');
            szerzo.textContent = data.szerzo;
            tr.appendChild(szerzo);

            const mufaj = document.createElement('td');
            mufaj.textContent = data.mufaj;
            tr.appendChild(mufaj);
 
            const cim  = document.createElement('td');
            cim.textContent = data.cim;
            tr.appendChild(cim);

            tbody.appendChild(tr);
        })
    }    

    /**
     * 
     * @returns {HTMLTableSectionElement}
     */
    #tableCreation(){
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
        return tbody;
    }
}

class Form extends Area {
    /**
     * @param {string} nameOfTheClass 
     * @param {Manager} manager 
     * 
    */
    constructor(nameOfTheClass, elementsOfField, manager){
        super(nameOfTheClass, manager);    
        const form = document.createElement('form');
        this.div.appendChild(form);
 
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
        form.appendChild(button);

        form.addEventListener('submit', (e)=> {
            e.preventDefault();

            const inputFields = e.target.querySelectorAll('input');
            const contentObject = {};

            for(const inputField of inputFields){
                contentObject[inputField.id] = inputField.value;
            }

            const alkotas = new AlkotasData(contentObject.szerzo, contentObject.mufaj, contentObject.cim);
            this.manager.addData(alkotas);
        })
    }
}