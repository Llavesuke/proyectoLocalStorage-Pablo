    const addContentButton = document.querySelector(".button-primary")
    let tweetItems = JSON.parse(localStorage.getItem("tweetItems")) || []

    const table = document.createElement("table")
    const tbody = document.createElement("tbody")
    table.appendChild(tbody)
    document.querySelector("#lista-tweets").appendChild(table)

    
    function createList() {
        tbody.innerHTML = "";
        

        if (tweetItems.length > 0) {
            for (let i = 0; i < tweetItems.length; i++) {
                createElementRow(tweetItems[i], i)
            }
        }
    }

    addContentButton.addEventListener("click", (e) => {
        e.preventDefault()
        const tweetInput = document.querySelector("#tweet").value
        if (tweetInput) {
            addToList(tweetInput)
            document.querySelector("#tweet").value = ""
        }
    });

    function saveTweetsToLocalStorage() {
        localStorage.setItem("tweetItems", JSON.stringify(tweetItems))
    }

    function createElementRow(textContent, index) {
        const row = document.createElement("tr")

        const tweetCell = document.createElement("td")
        tweetCell.textContent = textContent
        row.appendChild(tweetCell)

       
        const actionCell = document.createElement("td")
        const deleteButton = createDeleteButton(index)
        actionCell.appendChild(deleteButton)
        row.appendChild(actionCell)

        tbody.appendChild(row)
    }

    function createDeleteButton(index) {
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "X"
        deleteButton.classList.add("borrar-curso")

            deleteButton.addEventListener("click", () => {
            tweetItems.splice(index, 1)
            saveTweetsToLocalStorage()
            createList()
        });

        return deleteButton
    }

    function addToList(tweetToSave) {
        tweetItems.push(tweetToSave)
        saveTweetsToLocalStorage()
        createList()          
    }

    document.addEventListener("DOMContentLoaded", createList);