// CSV Handler Module - Handles data loading and parsing from external file

let csvData = null;

async function loadCSVData() {
    const statusDiv = document.getElementById('status');

    try {
        const response = await fetch('data.csv');

        if (!response.ok) {
            throw new Error('data.csv not found');
        }

        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                complete: function (results) {
                    csvData = results.data;
                    if (statusDiv) {
                        statusDiv.textContent = `✓ Data loaded: ${csvData.length} rows`;
                        statusDiv.style.background = '#e6f4ea';
                        statusDiv.style.color = '#137333';
                    }
                    console.log('CSV loaded successfully:', csvData.length, 'rows');
                    resolve(csvData);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });

    } catch (error) {
        if (statusDiv) {
            statusDiv.textContent = '✗ Error: Make sure data.csv is in the same folder as this HTML file';
            statusDiv.style.background = '#fce8e6';
            statusDiv.style.color = '#c5221f';
        }
        console.error('Error loading CSV:', error);
        throw error;
    }
}

function getRowData(rowNumber) {
    if (!csvData) {
        throw new Error('CSV data not loaded');
    }
    
    if (rowNumber < 1 || rowNumber > csvData.length) {
        throw new Error('Row number out of range');
    }
    
    return csvData[rowNumber - 1];
}

function getCSVRowCount() {
    return csvData ? csvData.length : 0;
}

function isCSVLoaded() {
    return csvData !== null;
}
