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

    /**
     * 
     * @param {string} label 
     * @returns {HTMLButtonElement}
     */
    createButton(label){
        const button = document.createElement('button');
        button.textContent = label;
        return button
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
       this.manager.setAddAlkotasCallback(this.#addAlkotasallback(tbody));
       this.manager.setRenderTableCallback(this.#renderTableCallback(tbody));
    }    

     /**
     * @param {HTMLTableSectionElement} tbody
     * @returns {function(AlkotasData[]):void}
     */
    #renderTableCallback(tbody){
        return (tomb) => {
            tbody.innerHTML = '';
            for(const alkotas of tomb){
                this.#addAlkotasToRow(alkotas, tbody);
            }
        }
    }

     /**
     * @param {HTMLTableSectionElement} tbody
     * @returns {function(AlkotasData):void}
     */
    #addAlkotasallback(tbody){
        return (alkotas) => {
            this.#addAlkotasToRow(alkotas, tbody);
        }
    }

     /**
     * @param {AlkotasData} alkotas
     * @param {HTMLTableSectionElement} tbody
     */
    #addAlkotasToRow(alkotas, tbody){
        const tr = document.createElement('tr');
              this.#createTD(tr, alkotas.szerzo);
              this.#createTD(tr, alkotas.mufaj);
              this.#createTD(tr, alkotas.cim);
                tbody.appendChild(tr);
    }

    /**
     * 
     * @param {HTMLTableRowElement} tr 
     * @param {string} textContent 
     * @param {HTMLElement} type 
     */
    #createTD(tr, textContent, type='td'){
        const td = document.createElement(type);
        td.textContent = textContent;
        tr.appendChild(td);
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
           this.#createTD(tr, content, "th");
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
     * @param {{fieldid: string, fieldLabel: string}[]} elementsOfField
     * @param {Manager} manager 
     * 
    */
    constructor(nameOfTheClass, elementsOfField, manager){
        super(nameOfTheClass, manager);   
        this.#formArray = []; 
        const form = this.#formCreation(elementsOfField);
        form.addEventListener("submit",this.#formEventListener());
        
     
    }

     /**
     * @param {{fieldid: string, fieldLabel: string}[]} fieldElements
     * @returns {HTMLFormElement}
     */
    #formCreation(fieldElements){
        const form = document.createElement('form');
    this.div.appendChild(form);

    for(const element of fieldElements){
        const formField = new FormField(element.fieldid, element.fieldLabel);
        this.#formArray.push(formField);
        form.appendChild(formField.getDiv()); 
    }

    const button = this.createButton("Hozzáadás");
    form.appendChild(button);
    return form;
}

    /**
     * @returns {function(Event):void}
     */
    #formEventListener(){
        return (e) =>{
            e.preventDefault();

            if(this.#fieldValidator()){
                const contentObject = this.#getContentObject();
                const alkotas = new AlkotasData(contentObject.szerzo, contentObject.mufaj, contentObject.cim);
                this.manager.addData(alkotas);
               }
        }
    }

    /**
     * 
     * @returns {boolean}
     */
    #fieldValidator(){
            let isValid = true;
            for(const formField of this.#formArray){
                formField.error = '';
                if(formField.value === ''){
                    formField.error = 'Kötelező megadni';
                    isValid = false;
                }
               
            }
            return isValid;
    }

    /**
     * 
     * @returns {{ szerzo: string, mufaj: string, cim: string }} 
     */
    #getContentObject(){
        const contentObject = {};
        for(const fieldOfForm of this.#formArray){
            contentObject[fieldOfForm.id] = fieldOfForm.value;
        }
        return contentObject;
    }
}

class UploadAndDownload extends Area{
    /**
     * 
     * @param {string} nameOfTheClass 
     * @param {Manager} manager 
     */
    constructor(nameOfTheClass, manager){
        super(nameOfTheClass, manager);
        const input = document.createElement('input')
        input.id ='fileinput';
        input.type ='file'
        this.div.appendChild(input);
        input.addEventListener("change",this.#uploadEventListener());
        const downloadButton = this.createButton("Letöltés");
        this.div.appendChild(downloadButton);
        downloadButton.addEventListener("click", this.#downloadEventListener());

       
    }

    /**
     * @returns {function():void}
     */
    #downloadEventListener(){
        return () =>{
            const link = document.createElement('a');
            const content = this.manager.generateDownloadString();
            const blob = new Blob([content])
            link.href = URL.createObjectURL(blob);
            link.download = 'ujabb_data.csv'
            link.click();
            URL.revokeObjectURL(link.href);
        }
    }

      /**
     * @returns {function(Event):void}
     */
    #uploadEventListener(){
        return (e) =>{
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
               const Lines = reader.result.split('\n')
               const headerRemoved = Lines.slice(1);
               for(const line of headerRemoved){
                    const trimmed = line.trim();
                    const fields = trimmed.split(';');
                    const alkotas = new AlkotasData(fields[0], fields[2], fields[1]);
                    this.manager.addData(alkotas);
               }
            }
            reader.readAsText(file);
        }
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
     * @type {HTMLInputElement}
    */
    #inputElement;
 

     /**
    * 
     * @type {HTMLLabelElement}
    */
    #labelElement;
 

     /**
    * 
     * @type {HTMLSpanElement}
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
     * @param {string} value
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

    /**
     * 
     * @returns {HTMLDivElement}
     */
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