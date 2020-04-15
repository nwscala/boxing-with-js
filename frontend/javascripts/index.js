document.addEventListener('DOMContentLoaded', function() {
    Box.loadBoxes();
    getItemForm().addEventListener("submit", Box.createItemFromForm)
    getBoxDiv().addEventListener('click', boxDivClick)
})
 
const getItemForm = () => document.getElementById("item-form")

const getBoxDiv = () => document.getElementById("box-div")



function boxDivClick(event) {
    event.preventDefault()
    if(event.target.className === "delete-text") {
        Box.deleteItemFromBox(event)
    } else if (event.target.className === "reveal-items") {
        Box.revealItemList(event)
    }
}