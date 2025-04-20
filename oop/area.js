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
     * @type {FormField[]}
     */
    #formArray

    /**
     * @param {string} nameOfTheClass 
     * @param {Manager} manager 
     * 
    */
    constructor(nameOfTheClass, elementsOfField, manager){
        super(nameOfTheClass, manager);   
        this.#formArray = []; 
        const form = document.createElement('form');
        this.div.appendChild(form);
 
        for(const element of elementsOfField){
            const formField = new FormField(element.fieldid, element.fieldLabel);
            this.#formArray.push(formField);
            form.appendChild(formField.getDiv()); 
        }
 
        const button = document.createElement('button');
        button.textContent = 'Hozzáadás';
        form.appendChild(button);

        form.addEventListener('submit', (e)=> {
            e.preventDefault();

            const contentObject = {};

            let isValid = true;
            for(const formField of this.#formArray){
                formField.error = '';
                if(formField.value === ''){
                    formField.error = 'Kötelező megadni';
                    isValid = false;
                }
                contentObject[formField.id] = formField.value;
            }

           if(isValid){
            const alkotas = new AlkotasData(contentObject.szerzo, contentObject.mufaj, contentObject.cim);
            this.manager.addData(alkotas);
           }
        })
    }
}

class FormField {

    /**
    * 
     * @type {string}
    */
    #id;
 

    /**
    * 
     * @type {HTMLElement}
    */
    #inputElement;
 

     /**
    * 
     * @type {HTMLElement}
    */
    #labelElement;
 

     /**
    * 
     * @type {HTMLElement}
    */
    #errorElement;

    /**
     * @returns {string}
     */
    get id(){
        return this.#id;
    }
 
    /**
     * @returns {string}
     */
    get value(){
        return this.#inputElement.value;
    }
 
    /**
     * @param {string}
     */
    set error(value){
        this.#errorElement.textContent = value;
    }

    /**
     * 
     * @param {string} id 
     * @param {string} labelContent 
     */
    constructor(id, labelContent){
        this.#id = id;

        this.#labelElement = document.createElement('label');
        this.#labelElement.htmlFor = id;
        this.#labelElement.textContent = labelContent;

        this.#inputElement = document.createElement('input');
        this.#inputElement.id = id;

        this.#errorElement = document.createElement('span');
        this.#errorElement.className = 'error';
    }

    getDiv(){
        const div = divmaker('field');
        const break1 = document.createElement('br')
        const break2 = document.createElement('br')
        const elements = [this.#labelElement, break1, this.#inputElement, break2, this.#errorElement];
        for(const element of elements){
            div.appendChild(element); 
        }
        return div;
    }
}