class Area{
    /**
     * 
     * @param {string} nameOfTheClass 
     */
    constructor(nameOfTheClass){
        let containerDiv = document.querySelector(".containeroop");
        if(!containerDiv){
            containerDiv = document.createElement("div");
            containerDiv.className = "containeroop";
            document.body.appendChild(containerDiv);
        }

        const div = document.createElement("div");
        div.className = nameOfTheClass;
        containerDiv.appendChild(div);
    }
}