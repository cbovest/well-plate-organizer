const appDiv = document.getElementById('app') as HTMLDivElement;
const menuDiv = document.getElementById('menu-bar') as HTMLDivElement;
const flexContainer = document.getElementById('flex-container') as HTMLDivElement;
const wellRowsContainer = document.getElementById('row-container') as HTMLDivElement;
const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
const colorPicker = document.getElementById('color-picker') as HTMLInputElement;

interface Well {
    id: number;
    label: string;
    color: string;
}

// Generate 96 wells labeled with coordinates
const rowLetters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rowNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateWells(): Well[] {

    const wells: Well[] = [];

    let Lettercount: number = 0;
    let Numbercount: number = 0;

    for (let i = 1; i <= 96; i++) {
        wells.push({ id: i, label: rowLetters[Lettercount] + rowNumbers[Numbercount], color: "lightgray"});
      
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

//Create top number labels
const numberLabels: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

// Display wells and row labels together on page
function renderWellPlate(wells: Well[], rowLabels: string[]): void {

        if (appDiv) {
        appDiv.innerHTML = '';
        flexContainer.innerHTML = '';
        wellRowsContainer.innerHTML = '';

        const wellsPerRow = 12;

        //Make divs for row labels
        const rowLabelDiv = document.createElement('div') as HTMLDivElement;
        rowLabelDiv.className = 'row-label-div';
        rowLabels.forEach(label => {
            const labelDiv = document.createElement('div') as HTMLDivElement;
            labelDiv.className = 'label';
            labelDiv.textContent = label;
            rowLabelDiv.appendChild(labelDiv);
        });

        //Make divs for number labels
        const numberLabelDiv = document.createElement('div') as HTMLDivElement;
        numberLabelDiv.className = 'number-label-div';
        numberLabels.forEach(digitlabel => {
            const digitlabelDiv = document.createElement('div') as HTMLDivElement;
            digitlabelDiv.className = 'digitlabel';
            digitlabelDiv.textContent = digitlabel;
            numberLabelDiv.appendChild(digitlabelDiv);
        });

        // Create rows and columns for the well plate
        for (let i = 0; i < wells.length; i += wellsPerRow) {
            const rowDiv = document.createElement('div') as HTMLDivElement;
            rowDiv.className = 'well-row';

            const rowWells = wells.slice(i, i + wellsPerRow);

            rowWells.forEach(well => {
                const wellDiv = document.createElement('div') as HTMLDivElement;
                wellDiv.className = 'well';
                wellDiv.textContent = well.label;
                wellDiv.style.backgroundColor = well.color;
                
            
                //Click to change color
                wellDiv.addEventListener('click', () => {
                    well.color = colorPicker.value;
                    wellDiv.style.backgroundColor = colorPicker.value;
                })

                // Add click event to update the well label
                wellDiv.addEventListener('dblclick', () => {
                    const newLabel = prompt(`Enter a label for Well ${well.label}:`, well.label);
                    if (newLabel !== null) {
                        well.label = newLabel;
                        renderWellPlate(wells, rowLabels); // Update the display
                    }
                })

                rowDiv.appendChild(wellDiv);
            });
            wellRowsContainer.appendChild(rowDiv);
        }
        flexContainer.appendChild(rowLabelDiv);
        flexContainer.appendChild(wellRowsContainer);

        appDiv.appendChild(numberLabelDiv);
        appDiv.appendChild(flexContainer);
        }
}

// Entry point
document.addEventListener('DOMContentLoaded', () => {
    const wells = generateWells();
    const rowLabels = generateRowLabels();
    renderWellPlate(wells, rowLabels);
});

resetButton.addEventListener('click', () => {
    
    wellRowsContainer.innerHTML = '';
    const wells = generateWells();
    const rowLabels = generateRowLabels();
    renderWellPlate(wells, rowLabels);
    });


