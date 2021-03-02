const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

const xSymbol = '🍔';
const oSymbol = '🍺';

let gameIsLive = true;
let xIsNext = true;


const letterToSymbol = (letter) => (letter === 'x' ? xSymbol : oSymbol);

const handleWin = (letter) => {
  gameIsLive = false;
  if (letter === 'x') {
    statusDiv.innerHTML = `${letterToSymbol(letter)} <b>Has Won!</b>`;
  } else {
    statusDiv.innerHTML = `<span>${letterToSymbol(letter)} <b>Has Won!</b></span>`;
  }
};

const checkGameStatus = () => {
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];


  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft);
    cellDivs[0].classList.add('Won');
    cellDivs[1].classList.add('Won');
    cellDivs[2].classList.add('Won');
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRight
  ) {
    handleWin(middleLeft);
    cellDivs[3].classList.add('Won');
    cellDivs[4].classList.add('Won');
    cellDivs[5].classList.add('Won');
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRight
  ) {
    handleWin(bottomLeft);
    cellDivs[6].classList.add('Won');
    cellDivs[7].classList.add('Won');
    cellDivs[8].classList.add('Won');
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft);
    cellDivs[0].classList.add('Won');
    cellDivs[3].classList.add('Won');
    cellDivs[6].classList.add('Won');
  } else if (
    topMiddle &&
    topMiddle === middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    handleWin(topMiddle);
    cellDivs[1].classList.add('Won');
    cellDivs[4].classList.add('Won');
    cellDivs[7].classList.add('Won');
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight);
    cellDivs[2].classList.add('Won');
    cellDivs[5].classList.add('Won');
    cellDivs[8].classList.add('Won');
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft);
    cellDivs[0].classList.add('Won');
    cellDivs[4].classList.add('Won');
    cellDivs[8].classList.add('Won');
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);
    cellDivs[2].classList.add('Won');
    cellDivs[4].classList.add('Won');
    cellDivs[6].classList.add('Won');
  } else if (
    topLeft &&
    topMiddle &&
    topRight &&
    middleLeft &&
    middleMiddle &&
    middleRight &&
    bottomLeft &&
    bottomMiddle &&
    bottomRight
  ) {
    gameIsLive = false;
    statusDiv.innerHTML = '<b>Game Is Tied!</b>';
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      statusDiv.innerHTML = `${xSymbol} <b>Is Next</b>`;
    } else {
      statusDiv.innerHTML = `<span>${oSymbol} <b>Is Next</b></span>`;
    }
  }
};

const handleReset = () => {
  xIsNext = true;
  statusDiv.innerHTML = `${xSymbol} <b>Is Next</b>`;
  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove('x');
    cellDiv.classList.remove('o');
    cellDiv.classList.remove('Won');
  }
  gameIsLive = true;
};

const handleCellClick = (e) => {
  const classList = e.target.classList;

  if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
    return;
  }

  if (xIsNext) {
    classList.add('x');
    checkGameStatus();
  } else {
    classList.add('o');
    checkGameStatus();
  }
};

resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
  cellDiv.addEventListener('click', handleCellClick);
}
