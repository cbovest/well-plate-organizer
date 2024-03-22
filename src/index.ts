interface Well {
    id: number;
    label: string;
}

// Generate 96 wells labeled with coordinates
const rowLetters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rowNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateWells(): Well[] {

    const wells: Well[] = [];

    let Lettercount: number = 0;
    let Numbercount: number = 0;

    for (let i = 1; i <= 96; i++) {
        wells.push({ id: i, label: rowLetters[Lettercount] + rowNumbers[Numbercount]});
      
        Numbercount+=1;
        if (Numbercount > 11) {
            Numbercount = 0;
            Lettercount+=1;
        }
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

        //Create container div for well rows
        const wellRowsContainer = document.createElement('div')
        wellRowsContainer.className = 'row-container'

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
            wellRowsContainer.appendChild(rowDiv);
        }
        appDiv.appendChild(wellRowsContainer);
        appDiv.className = 'app';
    }
}

// Entry point
document.addEventListener('DOMContentLoaded', () => {
    const wells = generateWells();
    const rowLabels = generateRowLabels();
    renderWellPlate(wells, rowLabels);
});

