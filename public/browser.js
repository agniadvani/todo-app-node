

function liTemplate(item){
    return `  <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
              <span class="item-text">${item.item}</span>
              <div>
                <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
              </div>
            </li>`
}

//render list
let liItem = items.map((item)=>{
    document.getElementById("list-item").insertAdjacentHTML('beforeend', liTemplate(item))
})


//Create Feature
let li = document.createElement("li");
document.getElementById("create-form").addEventListener("submit", (e)=>{
    e.preventDefault()
    if(document.getElementById("new-item").value.trim() !== ""){ 
    axios.post("/create-item", {item: document.getElementById("new-item").value}).then( (response) =>{
        document.getElementById("list-item").insertAdjacentHTML('beforeend',liTemplate(response.data))
    })
    } else {
        alert("The item cannot be <blank>.")
        document.getElementById("new-item").focus()
    }
})


document.addEventListener('click', (e) => {


    //Delete Feature

    if (e.target.classList.contains("delete-me")) {

        if (confirm(`Do you want to delete the item "${e.target.parentElement.parentElement.querySelector(".item-text").innerHTML}" parmanently?`)) {
            axios.post("/delete-item", { id: e.target.getAttribute("data-id") }).then(
                e.target.parentElement.parentElement.remove()
            ).catch(
                console.log("Error occured.")
            )
        }
    }
    //Update Feature
    if (e.target.classList.contains("edit-me")) {
        let updatedItem = prompt("Enter the updated item.", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
       
        if (updatedItem.trim() !== "") {
            axios.post("/update-item", { item: updatedItem, id: e.target.getAttribute("data-id") }).then(
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = updatedItem
            ).catch(() => {
                console.log("Failed")
            })
        }
    }
})