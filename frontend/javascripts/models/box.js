class Box {
    static all = []
    static renderedCheckboxes = false
    static renderedItemList = false
    
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
        this.size = data.size;
        this.items = data.items;
        this.save()
    }

    save() {
        Box.all.push(this);
    }

    static createBoxes(boxArray) {
        Box.all = []
        boxArray.forEach(boxData => new Box(boxData)) 
    }

    static makeBoxCheckboxes() {
        Box.all.forEach(box => { 
            let div = document.getElementById('box-checkboxes')
            let checkbox = document.createElement('input')
            let label = document.createElement('label')

            label.setAttribute('for', `box-${box.id}`)
            label.innerText = box.name

            checkbox.id = `box-${box.id}`
            checkbox.type = "checkbox"
            checkbox.value = box.id

            div.appendChild(checkbox);
            div.appendChild(label)
        });
    }

    static loadBoxes() {
        API.get('/boxes')
            .then(function(boxArray) {
                Box.createBoxes(boxArray)
                Box.renderBoxes()
                if (!Box.renderedCheckboxes) {
                    Box.makeBoxCheckboxes()
                    Box.renderedCheckboxes = true
                }
            })
            .catch(errors => console.log(errors))
    }

    template() {
        return `
            <h1>-----------</h1> 
            <div class="box" style="background-color:${this.color}">
                <h3>Box Name: ${this.name}</h3>
                <h3>Box Size: ${this.size}</h3>
                <h3>Box Color: ${this.color}</h3>
                <h3>Number of Items: ${this.items.length}</h3>
                <button class="reveal-items" data-boxID="${this.id}">Click here to get more details on the items in this box</button>
                <ul id="box-${this.id}-items-list">
                    
                </ul>
            </div> 
            `
    }

    boxItemTemplate() {
        return this.items.map(function(item, index) {
            return ` 
                    <li>
                        <h4>Item Number ${index + 1}</h4>
                        <h5>Item Name: ${item.name}</h5>
                        <h5>Item Size: ${item.size}</h5>
                        <h5>Item Description: ${item.description}</h5>
                        <button class="delete-text" data-boxID="${this.id}" data-itemID="${item.id}">Click here to remove this item from this box</button>
                    </li>
                    `
        }, this)
    }

    static renderBoxes() {
        let boxDiv = document.getElementById('box-div')
        boxDiv.innerHTML = ""
        Box.all.forEach(box => boxDiv.innerHTML += box.template())
    }

    static createItemFromForm(event) {
        event.preventDefault();

        const name = document.getElementById("name").value
        const size = document.getElementById("size").value 
        const description = document.getElementById("description").value  
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        const box_ids = []

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                box_ids.push(checkboxes[i].value)
            }
        }

        const strongParams = {
            item: {
                name,
                size,
                description,
                box_ids
            }
        }

        API.post("/items", strongParams)
            .then(function(itemData) {
                itemData.boxes.forEach(function(box) {
                    const rightBox = Box.all.find(function(boxObj) {
                        return boxObj.id === box.id
                    })
                    rightBox.items.push(itemData)
                })
                Box.renderBoxes();
            })
    }

    static deleteItemFromBox(event) {
        const boxID = event.target.dataset.boxid
        const itemID = event.target.dataset.itemid
    
        API.delete(`/boxes/${boxID}/items/${itemID}`)
            .then(messageObj => {
                if(messageObj.success) {
                    alert(messageObj.success)
                    Box.loadBoxes()
                } else if(messageObj.error) {
                    alert(messageObj.error)
                }
            })
    }

    static revealItemList(event) {
        const boxID = event.target.dataset.boxid
        const rightBox = Box.all.find(function(boxObj) {
            return boxObj.id === parseInt(boxID)
        })
        const rightUL = document.getElementById(`box-${boxID}-items-list`)
        if (!Box.renderedItemList) {
            rightUL.innerHTML = rightBox.boxItemTemplate().join(" ")
            Box.renderedItemList = true
            event.target.textContent = "Click here for fewer details on the items in this box"
        } else {
            rightUL.innerHTML = ""
            Box.renderedItemList = false
            event.target.textContent = "Click here to get more details on the items in this box"
        }
    }
}