const apiUrl = "http://localhost:8080/api/items";

document.addEventListener("DOMContentLoaded", loadItems);

function loadItems() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const itemsTable = document.getElementById("itemsTable");
            itemsTable.innerHTML = "";

            data.forEach(item => {
                let row = `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Delete</button>
                    </td>
                </tr>`;
                itemsTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error loading items:", error));
}

function addItem() {
    const name = document.getElementById("itemName").value;
    const price = document.getElementById("itemPrice").value;

    if (!name || !price) {
        alert("Please enter item name and price.");
        return;
    }

    const newItem = { name, price: parseFloat(price) };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("itemName").value = "";
        document.getElementById("itemPrice").value = "";
        loadItems();
    })
    .catch(error => console.error("Error adding item:", error));
}

function deleteItem(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => loadItems())
        .catch(error => console.error("Error deleting item:", error));
}
