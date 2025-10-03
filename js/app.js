// Main Application - Orchestrates everything

// Load CSV file on page load
window.addEventListener('load', async function () {
    try {
        await loadCSVData();
        document.getElementById('rowInput').focus();
    } catch (error) {
        console.error('Failed to load CSV:', error);
    }
});

function runSearch() {
    const rowNumber = parseInt(document.getElementById('rowInput').value);
    const resultADiv = document.getElementById('resultA');
    const resultBDiv = document.getElementById('resultB');

    // Validate input
    if (!rowNumber || rowNumber < 1) {
        resultADiv.innerHTML = '<span class="error">Please enter a valid row number</span>';
        resultBDiv.innerHTML = '<span class="error">Please enter a valid row number</span>';
        return;
    }

    // Check if data is loaded
    if (!isCSVLoaded()) {
        resultADiv.innerHTML = '<span class="error">Data not loaded yet</span>';
        resultBDiv.innerHTML = '<span class="error">Data not loaded yet</span>';
        return;
    }

    // Display results
    const success = displayResults(rowNumber);
    
    // Inicia o countdown APENAS se o resultado foi exibido com sucesso
    if (success) {
        startCountdown();
    }
}

// Allow Enter key to submit
document.getElementById('rowInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        runSearch();
    }
});
