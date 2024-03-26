"use strict";
//Generate menu div at top of page
const menuDiv = document.createElement('div');
menuDiv.className = 'menu-div';
//Make function that resets all well labels
function resetWellLabels() {
}
//Create reset labels button
const resetButton = document.createElement('button');
resetButton.className = 'reset-button';
resetButton.textContent = "Reset Wells";
menuDiv.appendChild(resetButton);
// Generate 96 wells labeled with coordinates
const rowLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function generateWells() {
    const wells = [];
    let Lettercount = 0;
    let Numbercount = 0;
    for (let i = 1; i <= 96; i++) {
        wells.push({ id: i, label: rowLetters[Lettercount] + rowNumbers[Numbercount] });
        Numbercount += 1;
        if (Numbercount > 11) {
            Numbercount = 0;
            Lettercount += 1;
        }
    }
    return wells;
}
// Create row labels
function generateRowLabels() {
    const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
    return rowLabels;
}
//Create top number labels
const numberLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
//Make container div to hold row labels and well plate
const flexContainer = document.createElement('div');
flexContainer.className = 'flex-container';
//Create container div for well rows
const wellRowsContainer = document.createElement('div');
wellRowsContainer.className = 'row-container';
// Display wells and row labels together on page
function renderWellPlate(wells, rowLabels) {
    const appDiv = document.getElementById('app');
    appDiv.className = 'app';
    if (appDiv) {
        appDiv.innerHTML = '';
        flexContainer.innerHTML = '';
        wellRowsContainer.innerHTML = '';
        const wellsPerRow = 12;
        //Make divs for row labels
        const rowLabelDiv = document.createElement('div');
        rowLabelDiv.className = 'row-label-div';
        rowLabels.forEach(label => {
            const labelDiv = document.createElement('div');
            labelDiv.className = 'label';
            labelDiv.textContent = label;
            rowLabelDiv.appendChild(labelDiv);
        });
        //Make divs for number labels
        const numberLabelDiv = document.createElement('div');
        numberLabelDiv.className = 'number-label-div';
        numberLabels.forEach(digitlabel => {
            const digitlabelDiv = document.createElement('div');
            digitlabelDiv.className = 'digitlabel';
            digitlabelDiv.textContent = digitlabel;
            numberLabelDiv.appendChild(digitlabelDiv);
        });
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
                    const newLabel = prompt(`Enter a label for Well ${well.label}:`, well.label);
                    if (newLabel !== null) {
                        well.label = newLabel;
                        renderWellPlate(wells, rowLabels); // Update the display
                    }
                });
                rowDiv.appendChild(wellDiv);
            });
            wellRowsContainer.appendChild(rowDiv);
        }
        flexContainer.appendChild(rowLabelDiv);
        flexContainer.appendChild(wellRowsContainer);
        appDiv.appendChild(menuDiv);
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
