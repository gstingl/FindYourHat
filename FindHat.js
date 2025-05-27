const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let currentRow = 0;
let currentCol = 0;
let gridSize = 2;

class Field {
  constructor(field) {
    this.field = field;
  }

  generateField(x, y, percent) {
    
  }

  print() {
    this.field.forEach(row => {
      console.log(row.join());
    })
  }

  updatePos() {
    this.field[currentRow][currentCol] = '*';
    process.stdout.write('\x1Bc');
    this.print();
  }

  posCheck() {
    if(currentRow > gridSize | currentRow < 0 | currentCol > gridSize | currentCol < 0) {
      console.log('You went out of bounds!')
    } else if(this.field[currentRow][currentCol] === hole) {
      console.log('You fell in a hole dummy');
    } else if(this.field[currentRow][currentCol] === '^') {
      this.updatePos();
      console.log('You found your hat!');
    } else this.updatePos();
  }

  moveDown() {
    this.field[currentRow][currentCol] = '░';
    currentRow++;
    this.posCheck();
  }

  moveUp() {
    this.field[currentRow][currentCol] = '░';
    currentRow--;
    this.posCheck();
  }

  moveRight() {
    this.field[currentRow][currentCol] = '░';
    currentCol++;
    this.posCheck();
  }

    moveLeft() {
    this.field[currentRow][currentCol] = '░';
    currentCol--;
    this.posCheck();
  }
}

//chooses which method in the Field class to run based on the users input
 function chooseDirection(userInput) {
    let direction = userInput.toString().trim();
    switch(direction) {
          case 'up':
            myField.moveUp();
            break;
          case 'down':
            myField.moveDown();
            break;
          case 'right':
            myField.moveRight();
            break;
          case 'left':
            myField.moveLeft();
            break;
          default:
            console.log('Invalid Input');
    }
 }

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

//Print starting field
process.stdout.write('\x1Bc');
myField.print();

//This will start accepting any input and running the below func that is the second arg
process.stdin.on('data', chooseDirection);
