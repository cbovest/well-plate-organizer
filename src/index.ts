interface Well {
    id: number;
    label: string;
}

// Generate 96 wells
function generateWells(): Well[] {
    const wells: Well[] = [];
    for (let i = 1; i <= 96; i++) {
        wells.push({ id: i, label: `Well ${i}` });
    }
    return wells;
}

// Create row labels
function generateRowLabels(): string[] {
    const rowLabels: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
    return rowLabels;
}

// Display everything together on page
function renderWellPlate(wells: Well[], rowLabels: string[]): void {
    const appDiv = document.getElementById('app');

    if (appDiv) {
        appDiv.innerHTML = ''; // Clear previous content

        const wellsPerRow = 12;

        // Render row labels
        const rowLabelDiv = document.createElement('div');
        rowLabelDiv.className = 'row-labels';
        rowLabels.forEach(label => {
            const labelDiv = document.createElement('div');
            labelDiv.className = 'label';
            labelDiv.textContent = label;
            rowLabelDiv.appendChild(labelDiv);
        });
        appDiv.insertBefore(rowLabelDiv, appDiv.firstChild); 

        // Create rows and columns for the well plate
        for (let i = 0; i < wells.length; i += wellsPerRow) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'well-row';

            const rowWells = wells.slice(i, i + wellsPerRow);

            rowWells.forEach(well => {
                const wellDiv = document.createElement('div');
                wellDiv.className = 'well';
                wellDiv.textContent = well.label;

                // Add click event to update the well label
                wellDiv.addEventListener('click', () => {
                    const newLabel = prompt(`Enter a label for Well ${well.id}:`, well.label);
                    if (newLabel !== null) {
                        well.label = newLabel;
                        renderWellPlate(wells, rowLabels); // Update the display
                    }
                });

                rowDiv.appendChild(wellDiv);
            });

            appDiv.appendChild(rowDiv);
        }
    }
}

// Entry point
document.addEventListener('DOMContentLoaded', () => {
    const wells = generateWells();
    const rowLabels = generateRowLabels();
    renderWellPlate(wells, rowLabels);
});

