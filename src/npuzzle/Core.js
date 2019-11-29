// ----- MODEL --------
export const GameStateEnum = { PLAYING: 1, WON: 2 };

export class Tile {
  constructor(value) {
    this.value = value;
  }
}

export class Field {
  constructor(rowCount, colCount) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.numberCount = rowCount * colCount - 1;
    this.field = [];
    this.emptyRow = null;
    this.emptyCol = null;
    this.gameState = GameStateEnum.PLAYING;
    this.generate();
  }

  generate() {
    this.field = [];
    this.gameState = GameStateEnum.PLAYING;

    for (let row = 0; row < this.rowCount; row++) {
      this.field.push([]);
      this.field[row].length = this.colCount;
    }

    let randomRow, randomCol;
    let counter = 1;

    do {
      randomRow = Math.floor(Math.random() * this.rowCount);
      randomCol = Math.floor(Math.random() * this.colCount);

      if (!this.field[randomRow][randomCol]) {
        this.field[randomRow][randomCol] = new Tile(counter);
        counter++;
      }
    } while (counter <= this.numberCount + 1);

    this.emptyRow = randomRow;
    this.emptyCol = randomCol;
  }

  changePosition(row, col) {
    const distanceRow = Math.abs(row - this.emptyRow);
    const distanceCol = Math.abs(col - this.emptyCol);

    if (distanceRow + distanceCol === 1) {
      this.field[this.emptyRow][this.emptyCol].value = this.field[row][
        col
      ].value; // na prazdne policko dam hodnotu kliknuteho policka
      this.field[row][col].value = this.numberCount + 1; //prazdne policko
      this.emptyRow = row;
      this.emptyCol = col;
    }

    if (this.isGameWon()) {
      this.gameState = GameStateEnum.WON;
    }
  }

  isGameWon() {
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        let expectedValue = this.colCount * row + col + 1;
        if (this.field[row][col].value != expectedValue) {
          return false;
        }
      }
    }
    return true;
  }
}

// ----- END MODEL ----------
