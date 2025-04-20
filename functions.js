/**
 * @typedef {Object} Alkotas
 */





/**
 * 
 * @param {string} Classname 
 * @returns {HTMLDivElement}
 */
const divmaker = (Classname) =>{
    const div = document.createElement("div");
    div.className = Classname;
    return div;
}

/**
 * @param {Alkotas}
 */
 tombPush= (obj) =>  {
    tomb.push(obj);
}
/**
 * 
 * @param {HTMLDivElement} container 
 * @param {function(HTMLTableSectionElement):void} callback 
 */
const createTable = (container, callback) => {
    const tableDiv = divmaker('table');
    container.appendChild(tableDiv);
    
    const tableRegular = document.createElement('table');
    tableDiv.appendChild(tableRegular);

    const tableHead = document.createElement('thead');
    tableRegular.appendChild(tableHead);

    const tr =  document.createElement('tr');
    tableHead.appendChild(tr)

    const theadCells = ['Szerző', 'Műfaj', 'Cím'];
    for(const cellContent of theadCells){
        const thcell = document.createElement('th');
        thcell.innerText = cellContent;
        tr.appendChild(thcell);
    }
    const tbody = document.createElement('tbody');
    tableRegular.appendChild(tbody);
    callback(tbody);
}

/**
 * @param {HTMLTableSectionElement} tbody
 * @param {HTMLElement} container
 * @param {Alkotas[]} alkotasArray 
 */
const uploads = (tbody, container, alkotasArray) => {

    const fileInput = document.createElement('input')
    container.appendChild(fileInput);
    fileInput.id='fileinput'
    fileInput.type = 'file';

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
           const Lines = reader.result.split('\n')
           const headerRemoved = Lines.slice(1);
           for(const line of headerRemoved){
                const trimmed = line.trim();
                const fields = trimmed.split(';');
                const alkotas = {
                    szerzo: fields[0],
                    mufaj: fields[2],
                    cim: fields[1]
                }
                tombPush(alkotas);
                addRow(alkotas, tbody);
           }
        }
        reader.readAsText(file);
    });
};

/**
 * @param {HTMLTableSectionElement} tbody
 * @param {HTMLElement} container
 * @param {Alkotas[]} alkotasArray 
 */
const formCreation = (tbody, container, alkotasArray) => {
    const formDiv = divmaker('form');
    container.appendChild(formDiv);

    const formRegular = document.createElement('form');
    formDiv.appendChild(formRegular)

    const elements = [{
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

    for(const element of elements){
        const field = divmaker('field');
        formRegular.appendChild(field);

        const label = document.createElement('label');
        label.htmlFor = element.fieldid;
        label.textContent = element.fieldLabel;
        field.appendChild(label)

        field.appendChild(document.createElement('br'))
        const input = document.createElement('input');
        input.id = element.fieldid;
        field.appendChild(input)

        field.appendChild(document.createElement('br'))
        const error = document.createElement('span');
        error.className = 'error';
        field.appendChild(error);
    }

    const buttonFormRegular = document.createElement('button');
    buttonFormRegular.textContent = 'Hozzáadás';
    formRegular.appendChild(buttonFormRegular)

    formRegular.addEventListener('submit', (e)=> {
        e.preventDefault();
        const contentObject = {}
        const inputFields = e.target.querySelectorAll('input');
        let Isvalid = true;
        for(const inputField of inputFields){
            const error = inputField.parentElement.querySelector('.error');
            if(!error){
                console.error('nincs errorfield');
                return;
            }
            error.textContent = '';
            if(inputField.value === ''){
                error.textContent = 'Kotelezo megadni';
                Isvalid = false;
            }
            contentObject[inputField.id] = inputField.value;
        }
        if(Isvalid){
            tombPush(contentObject);
            addRow(contentObject, tbody);
        }
    })
}

/**
 * @param {Alkotas} object
 * @param {HTMLTableSectionElement} tbody
 */
const addRow = (object, tbody) => {

    const tr = document.createElement('tr');

    const szerzo = document.createElement('td');
    szerzo.textContent = object.szerzo;
    tr.appendChild(szerzo);

    const mufaj = document.createElement('td');
    mufaj.textContent = object.mufaj;
    tr.appendChild(mufaj);
    tbody.appendChild(tr);

    const cim = document.createElement('td');
    cim.textContent = object.cim;
    tr.appendChild(cim);
}

/**
 * @param {HTMLElement} container
 * @param {Alkotas[]} alkotasArray 
 */
const downloads = (container, alkotasArray) => {

    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Letöltés';
    container.appendChild(downloadButton);
    
    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        const contents = ['szero;mufaj;cim']
        for(const alkotas of alkotasArray){
            contents.push(`${alkotas.szerzo};${alkotas.mufaj};${alkotas.cim}`);
        }

        const content = contents.join('\n');
        const file = new Blob([content])
        link.href = URL.createObjectURL(file);
        link.download = 'newdata.csv'
        link.click();
        URL.revokeObjectURL(link.href);
    })
}


/**
 * @param {HTMLTableSectionElement} tbody
 * @param {HTMLElement} containerDiv
 * @param {Alkotas[]} tomb 
 * @returns {{ originalArrayFill: function():void, sortedTable: function(Alkotas[]):void }}
 */
const sortForm = (tbody, containerDiv, tomb) => {
    const sortFormDiv = divmaker('sortForm');
    containerDiv.appendChild(sortFormDiv);

    const sortForm = document.createElement('form');
    sortFormDiv.appendChild(sortForm);

    const sortSelect = document.createElement('select');
    sortForm.appendChild(sortSelect);

    const sortOptions = [
        { value: '', 
            innerText: 'üres' 
        },
        { value: 'cim', 
            innerText: 'cím' 
        },
        { value: 'szerzo', 
            innerText: 'szerző' 
        }
    ];

    for(const option of sortOptions){
        const element = document.createElement('option');
        element.value = option.value;
        element.innerText = option.innerText;
        sortSelect.appendChild(element);
    }

    const sortButton = document.createElement('button');
    sortButton.innerText = 'Rendezés';
    sortForm.appendChild(sortButton);

    const originalArray = [];

    const originalArrayFill = () => {
        originalArray.length = 0;
        for(const element of tomb) {
            const alkotas = {
                szerzo: element.szerzo,
                mufaj: element.mufaj,
                cim: element.cim
            };
            originalArray.push(alkotas);
        }
    }

    /** 
     * @param {Alkotas[]} data
     */
    const sortedTable = (data) => {
        tbody.innerHTML = '';
        for(const element of data){
            const tr = document.createElement('tr');
            tbody.appendChild(tr);

            const szerzo = document.createElement('td');
            szerzo.textContent = element.szerzo;
            tr.appendChild(szerzo);

            const mufaj = document.createElement('td');
            mufaj.textContent = element.mufaj;
            tr.appendChild(mufaj);

            const cim = document.createElement('td');
            cim.textContent = element.cim;
            tr.appendChild(cim);
        }
    }

    sortForm.addEventListener('submit', (e) => {
        e.preventDefault();
        originalArrayFill();
        let sortedArray = [];
        if(sortSelect.value === '') {
            sortedArray = originalArray.slice();
        } else {
            sortedArray = tomb.slice();
            for(let i = 0; i < sortedArray.length - 1; i++) {
                for(let j = 0; j < sortedArray.length - i - 1; j++) {
                    const a = (sortedArray[j][sortSelect.value]).toLowerCase();
                    const b = (sortedArray[j+1][sortSelect.value]).toLowerCase();
                    if(a > b) {
                        const temp = sortedArray[j];
                        sortedArray[j] = sortedArray[j+1];
                        sortedArray[j+1] = temp;
                    }
                }
            }
        }
        sortedTable(sortedArray);
    });

    originalArrayFill();
    return { originalArrayFill, sortedTable };
}
