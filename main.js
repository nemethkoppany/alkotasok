const tomb = [];
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
    field.appendChild(document.createElement("br"));
    const label = document.createElement('label');
    label.htmlFor = fieldElement.fieldid;
    label.textContent = fieldElement.fieldLabel;
    field.appendChild(label)
    field.appendChild(document.createElement('br'))
    const input = document.createElement('input');
    input.id = fieldElement.fieldid;
    field.appendChild(input)

    field.appendChild(document.createElement('br'))
    const error = document.createElement('span');
    error.className = 'error';
    field.appendChild(error);
}
 
const buttonFormRefular = document.createElement('button');
buttonFormRefular.textContent = 'Hozzáadás';
formRegular.appendChild(buttonFormRefular)

formRegular.addEventListener('submit', (e)=> {
    e.preventDefault();

    const contentObject = {}
    const fieldInputs = e.target.querySelectorAll('input');
    let isValid = true;
    for(const fieldinput of fieldInputs){
        const error = fieldinput.parentElement.querySelector('.error');
        if(!error){
            console.error('Nincs errorField');
            return;
        }
        error.textContent = '';
        if(fieldinput.value === ''){
            error.textContent = 'Kötelező megadni';
            isValid = false;
        }
        contentObject[fieldinput.id] = fieldinput.value;
    }
   
    if(isValid){
        tomb.push(contentObject);
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
     
        const szerzo = document.createElement('td');
        szerzo.textContent = contentObject.szerzo;
        tr.appendChild(szerzo);
     
        const mufaj = document.createElement('td');
        mufaj.textContent = contentObject.mufaj;
        tr.appendChild(mufaj);
    
        const cim = document.createElement('td');
        cim.textContent = contentObject.cim;
        tr.appendChild(cim);
    }
})

containerDiv.appendChild(tableDiv);
containerDiv.appendChild(formDiv);

const input = document.createElement('input')
containerDiv.appendChild(input);
input.id='fileinput'
input.type = 'file';

input.addEventListener('change', (e) => {

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
       const Lines = reader.result.split('\n')
       const headerRemoved = Lines.slice(1);

       for(const line of headerRemoved){
            const timmed = line.trim();
            const fields = timmed.split(';');
            const alkotasok = {
                szerzo: fields[0],
                mufaj: fields[2],
                cim: fields[1]
            }

            tomb.push(alkotasok);

            const tr = document.createElement('tr');
            tbody.appendChild(tr);

            const szerzo = document.createElement('td');
            szerzo.textContent = alkotasok.szerzo;
            tr.appendChild(szerzo);

            const mufaj = document.createElement('td');
            mufaj.textContent = alkotasok.mufaj;
            tr.appendChild(mufaj);
 
            const cim = document.createElement('td');
            cim.textContent = alkotasok.cim;
            tr.appendChild(cim);
       }
    }
    reader.readAsText(file);
});


const downloadButton = document.createElement('button');
downloadButton.textContent = 'Letöltés';
containerDiv.appendChild(downloadButton);
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    const contents = ['name;birth;zipcode']
    for(const alkotas of tomb){
        contents.push(`${alkotas.szerzo};${alkotas.mufaj};${alkotas.cim}`);
    }
    const content = contents.join('\n');
    const blob = new Blob([content])
    link.href = URL.createObjectURL(blob);
    link.download = 'tovabbi_data.csv'
    link.click();
    URL.revokeObjectURL(link.href);
});

