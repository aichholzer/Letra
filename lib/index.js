'use strict';


var Letra = function Letra () {
    process.argv.splice(0, 2);
    this.language = process.argv[0].toLowerCase();

    this.grid = [];
    this.linearChars = [];
    this.letters = require('../languages/' + this.language + '.json');
    this.letterFrequency();
    return this;
};

Letra.prototype.letterFrequency = function letterFrequency() {

    for (var l in this.letters) {
        this.letters[l] = Math.round((25 * this.letters[l]) / 100) || 1;
    }
};

Letra.prototype.makeGrid = function makeGrid(row) {

    row = row || 0;
    var makeCol = (col) => {

        col = col || 0;
        this.grid[row][col] = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);

        this.linearChars.push(this.grid[row][col]);

        col += 1;
        if (col < 5) {
            makeCol(col);
        }
    };

    this.grid[row] = [];
    makeCol();

    row += 1;
    if (row < 5) {
        makeGrid(row);
    }
};

var letra = new Letra();
letra.makeGrid();
console.log(letra.grid);
return;

var grid = [],
    linearChars = [],
    letterCount = {
        x: 1
    },
    makeRow = function (row) {

        var makeCol = function (col) {
            grid[row][col] = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);

            if (letterCount[grid[row][col]]) {
                letterCount[grid[row][col]] += 1;
            } else {
                letterCount[grid[row][col]] = 1;
            }

            linearChars.push(grid[row][col]);

            col += 1;
            if (col < 5) {
                makeCol(col);
            }
        };

        grid[row] = [];
        makeCol(0);

        row += 1;
        if (row < 5) {
            makeRow(row);
        }
    };

makeRow(0);

console.log(grid);
console.log(letterCount);
console.log(linearChars.sort());

