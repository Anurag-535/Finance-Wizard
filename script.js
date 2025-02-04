let totalIncome = 0;
let totalExpenses = 0;

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Please fill in all fields correctly.");
        return;
    }

    // Create a new row in the table
    const table = document.getElementById('transactions-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    // Add the description cell
    const descriptionCell = row.insertCell(0);
    descriptionCell.textContent = description;

    // Add the amount cell
    const amountCell = row.insertCell(1);
    amountCell.textContent = `$${amount.toFixed(2)}`;

    // Add the type cell
    const typeCell = row.insertCell(2);
    typeCell.textContent = type.charAt(0).toUpperCase() + type.slice(1);

    // Add the action cell (Delete button)
    const actionCell = row.insertCell(3);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        deleteTransaction(row, type, amount);
    };
    actionCell.appendChild(deleteButton);

    // Update totals and balance
    updateTotals(type, amount);
    
    // Clear input fields
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

function deleteTransaction(row, type, amount) {
    // Remove the row from the table
    row.remove();

    // Update totals and balance
    updateTotals(type, -amount);
}

function updateTotals(type, amount) {
    if (type === 'income') {
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }

    const balance = totalIncome - totalExpenses;

    // Update the display
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
}
