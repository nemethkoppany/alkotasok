class SortForm extends Area {
    /**
     * 
     * @param {string} nameOfTheClass 
     * @param {Manager} manager 
     */
    constructor(nameOfTheClass, manager) {
        super(nameOfTheClass, manager);

        const form = document.createElement('form');
        this.div.appendChild(form);

        const select = document.createElement('select');
        form.appendChild(select);

        const options = [
            { 
                value: '', 
                innerText: 'üres' 
            },
            { 
                value: 'cim', 
                innerText: 'cím' 
            },
            { 
                value: 'szerzo', 
                innerText: 'szerző' 
            }
        ];
        for (const option of options) {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.innerText = option.innerText;
            select.appendChild(optionElement);
        }

        const button = this.createButton("Szűrés")
        form.appendChild(button);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const sortedValue = select.value;
            if (sortedValue === '') {
                manager.renderOriginal();
            } else {
                manager.sort((alkotas1, alkotas2) => {
                    const value1 = (alkotas1[sortedValue]).toLowerCase();
                    const value2 = (alkotas2[sortedValue]).toLowerCase();
                    if (value1 < value2) {
                        return -1
                    };
                    if (value1 > value2) {
                        return 1
                    }
                    else{
                    return 0;
                    }
                });
            }
        });
    }
}