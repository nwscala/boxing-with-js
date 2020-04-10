document.addEventListener('DOMContentLoaded', function() {
    loadBoxes();
})
 

async function loadBoxes() {
    let response = await fetch('http://localhost:3000/boxes')
    let boxes = await response.json();

    boxes.forEach(data => {
        let box = new Box(data);
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

    document.querySelector('form').addEventListener('submit', createItem)
}

async function createItem(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const size = document.getElementById('size').value;
    const description = document.getElementById('description').value;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    const box_ids = [];

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

    

    debugger;
}