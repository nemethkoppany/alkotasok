const divmaker = (Classname) =>{
    const div = document.createElement("div");
    div.className = Classname;
    return div;
}

const containerDiv = divmaker("container");
document.body.appendChild(containerDiv);
const tableDiv = divmaker("table");

const formDiv = divmaker("form");

containerDiv.appendChild(tableDiv);
containerDiv.appendChild(formDiv);