document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/getAll')
        .then(res => res.json())
        .then(data => loadHTMLTable(data['data']));

});

const addBtn = document.querySelector('#add-name-btn');
const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function () {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:3000/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}

addBtn.addEventListener('click', () => {
    const nameInput = document.querySelector('#name-input');

    const name = nameInput.value;
    nameInput.value = '';

    fetch('http://localhost:3000/insert', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    })
        .then(res => res.json())
        .then(data => insertRowIntoTable(data['data']))
})

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dataAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }

}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = `<tr><td class="no-data" colspan="5">No Data</td></tr>`;
        return;
    }
    let tableHtml = "";

    data.forEach(({ id, name, data_added }) => {
        tableHtml += `
            <tr>
                <td> ${id}</td>
                <td> ${name}</td>
                <td> ${new Date(data_added).toLocaleString()}</td>
                <td> <button class="delete-row-btn" data-id=${id}> Delete</button></td>
                <td> <button class="edit-row-btn" data-id=${id}> Edit</button></td>
            </tr>`;
    });
    table.innerHTML = tableHtml;
}

document.querySelector('table tbody').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

function deleteRowById(id) {
    fetch('http://localhost:3000/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function () {
    const updateNameInput = document.querySelector('#update-name-input');


    console.log(updateNameInput);

    fetch('http://localhost:3000/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}
