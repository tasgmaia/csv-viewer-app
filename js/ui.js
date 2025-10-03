// UI Module - Handles all display and DOM manipulation

function displayResults(rowNumber) {
    const resultADiv = document.getElementById('resultA');
    const resultBDiv = document.getElementById('resultB');

    try {
        // Check if row exists
        if (rowNumber > getCSVRowCount()) {
            resultADiv.innerHTML = '<span class="error">Row ' + rowNumber + ' not found</span>';
            resultBDiv.innerHTML = '<span class="error">Only ' + getCSVRowCount() + ' rows available</span>';
            return false;
        }

        const rowData = getRowData(rowNumber);

        // Get column A (index 0) and column B (index 1)
        const valueA = rowData[0] || '';
        const valueB = rowData[1] || '';

        resultADiv.innerHTML = valueA ? valueA : '<span class="empty">(empty)</span>';
        resultBDiv.innerHTML = valueB ? valueB : '<span class="empty">(empty)</span>';
        
        return true; // Sucesso

    } catch (error) {
        showError(error.message);
        return false;
    }
}

function showError(message) {
    const resultADiv = document.getElementById('resultA');
    const resultBDiv = document.getElementById('resultB');
    
    resultADiv.innerHTML = '<span class="error">' + message + '</span>';
    resultBDiv.innerHTML = '<span class="error">' + message + '</span>';
}

function clearResults() {
    document.getElementById('resultA').innerHTML = '-';
    document.getElementById('resultB').innerHTML = '-';
}
