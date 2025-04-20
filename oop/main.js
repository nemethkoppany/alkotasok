const separator = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(separator);

const fieldElements = [{
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

const manager = new Manager();
const table = new Table("table",manager);
const form = new Form("form",fieldElements, manager);