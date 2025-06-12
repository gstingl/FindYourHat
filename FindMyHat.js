const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let currentRow;
let currentCol;
let fieldLength;
let fieldWidth;

class Field {
  constructor(field) {
    this.field = field;
  }

  print() {
    this.field.forEach(row => {
      console.log(row.join());
    })
  }

  endGame() {

  }

  updatePos() {
    this.field[currentRow][currentCol] = '*';
    process.stdout.write('\x1Bc');
    this.print();
  }

  posCheck() {
    if(currentRow > fieldWidth | currentRow < 0 | currentCol > fieldLength | currentCol < 0) {
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


function chooseTile(percent) {
  const randomNum = Math.floor(Math.random() * 100) + 1;
  if (randomNum >= percent && randomNum <= 100) {
    return '░';
  } else {
    return 'O';
  }
}


function createField(length, width, percent) {
  let fieldArray = [];
  fieldLength = length;
  fieldWidth = width;
  currentCol = Math.floor(Math.random() * width) + 1;
  currentRow = Math.floor(Math.random() * length) + 1;
  let hatX = Math.floor(Math.random() * width) + 1;
  let hatY = Math.floor(Math.random() * width) + 1;

  for (let i = length; 0 < i; i--) {
    innerArray = [];
    for (let j = width; 0 < j; j--) {
      innerArray.push(chooseTile(percent));
    }
    fieldArray.push(innerArray);
  }

  //Places the '*' or start point after creating the field
  fieldArray[currentRow][currentCol] = '*';
  fieldArray[hatX][hatY] = '^';

  return fieldArray;
}

const myField = new Field(createField(10, 10, 20));

//Print starting field
process.stdout.write('\x1Bc');
myField.print();

//This will start accepting any input and running the below func that is the second arg
process.stdin.on('data', chooseDirection);
