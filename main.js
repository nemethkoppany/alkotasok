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

containerDiv.appendChild(tableDiv);
containerDiv.appendChild(formDiv);