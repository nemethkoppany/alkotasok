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

const containerDiv = divmaker("container");
document.body.appendChild(containerDiv);
const tableDiv = divmaker("table");

const tableRegular = document.createElement("table");
tableDiv.appendChild(tableRegular);

const thead = document.createElement("thead");
tableRegular.appendChild(thead);

const tr = document.createElement("tr");
thead.appendChild(tr);

const headercells = ["Szerző","Műfaj", "Cím"];
for(const header of headercells){
    const th = document.createElement("th");
    th.innerHTML = header;
    tr.appendChild(th);
}

const tbody = document.createElement("tbody");
tableRegular.appendChild(tbody);


const formDiv = divmaker("form");

const formRegular = document.createElement('form');
formDiv.appendChild(formRegular) 

const fieldElementList = [{
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
 
for(const fieldElement of fieldElementList){
    const field = divmaker('field');
    formRegular.appendChild(field);

    const label = document.createElement('label');
    label.htmlFor = fieldElement.fieldid;
    label.textContent = fieldElement.fieldLabel;
    field.appendChild(label)
 
    const input = document.createElement('input');
    input.id = fieldElement.fieldid;
 
    field.appendChild(document.createElement('br'))

    field.appendChild(input)
}
 
const buttonFormRefular = document.createElement('button');
buttonFormRefular.textContent = 'hozzáadás';
formRegular.appendChild(buttonFormRefular)

containerDiv.appendChild(tableDiv);
containerDiv.appendChild(formDiv);