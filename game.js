const gameboardObject = (function() {
    const gameboard = ["Dummy element because counting from one is easier than zero for imagining a 3 x 3 board and associating numbers with each tile and now I'm just rambling", 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const getGameBoard = () => {
        return gameboard;
    };

    let filledCount = 0;

    const setStartingPlayer = (input) => {
        gameActive = true;
        currentPlayer = input;
        enableGameSquares();
        disableStart();
    };

    let result = undefined;
    const getResult = () => {
        return result;
    };

    let gameActive = false;
    const getActive = () => {
        return gameActive;
    };

    let currentPlayer;

    const placeTile = (item, position) => {
        currentPlayer = item;
        gameboard.splice(position, 1, item);
        filledCount ++;
        if (winningNumberCheck() === true){
            result = 'win';
            gameActive = false;
            disableGameSquares();
        }
        if (filledCount === 9 && result !== 'win'){
            result = 'draw';
            gameActive = false;
            disableGameSquares();
        };
    };

    const winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    const winningNumberCheck = function(){
        for (let index = 0; index < winningCombinations.length; index++) {
            if (gameboard[winningCombinations[index][0]] !== 0 && gameboard[winningCombinations[index][0]] === gameboard[winningCombinations[index][1]] && gameboard[winningCombinations[index][0]] === gameboard[winningCombinations[index][2]]){
                return true;
            }
        };
        return false;
    };

    const resetGame = function (){
        gameboard.fill(0, 1);
        filledCount = 0;
        gameActive = true;
        result = undefined;
    };

    ///// DOM FUNCTIONS BELOW

    const body = document.body;
    const resetButton = body.querySelector('.resetButton');
    const startButton = body.querySelectorAll('.startButton');
    const gameSquares = body.querySelectorAll('.gameSquare');
    gameSquares.forEach(element => {
        element.disabled = true;
    });

    startButton.forEach(element => {
        element.addEventListener('click', () => {
            setStartingPlayer(element.innerText);
        });
    });

    resetButton.addEventListener('click', () => {
        resetGame();
        enableStart();
        gameSquares.forEach(element => {
            element.disabled = false;
            element.innerText = "";
        });
    });

    gameSquares.forEach(element => {
        element.addEventListener('click', (event) => {
            const targetId = event.target.id * 1;
            if (filledCount !== 0){
                currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
            }
            placeTile(currentPlayer, targetId);
            element.innerText = currentPlayer;
            event.target.disabled = true;
        });
    });

    const disableGameSquares = () => {
        gameSquares.forEach(element => {
            element.disabled = true;
        });
    };

    const enableGameSquares = () => {
        gameSquares.forEach(element => {
            element.disabled = false;
        });
    };

    const disableStart = () => {
        startButton.forEach(element => {
            element.disabled = true;
        });
    }

    const enableStart = () => {
        startButton.forEach(element => {
            element.disabled = false;
        });
    }

    return {placeTile, winningNumberCheck, getActive, getResult, resetGame, getGameBoard, setStartingPlayer};
})();

















