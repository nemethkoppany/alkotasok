const tomb = [];

const containerDiv = divmaker("container");
document.body.appendChild(containerDiv);
createTable(containerDiv, (tbody) =>{
    formCreation(tbody, containerDiv, tomb);
    uploads(tbody, containerDiv, tomb);
    downloads(containerDiv, tomb);
    sortForm(tbody, containerDiv, tomb);
})