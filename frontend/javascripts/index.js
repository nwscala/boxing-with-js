document.addEventListener('DOMContentLoaded', function() {
    Box.loadBoxes();
    getItemForm().addEventListener("submit", Box.createItemFromForm)
})
 
let getItemForm = () => document.getElementById("item-form")
