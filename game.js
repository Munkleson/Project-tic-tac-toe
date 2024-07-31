

const gameboardObject = (function() {
    const gameboard = ["Dummy element because counting from one is easier than zero for imagining a 3 x 3 board and associating numbers with each tile and now I'm just rambling", 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const getGameBoard = () => {
        return gameboard;
    };

    let filledCount = 0;

    let startingPlayer;
    const setStartingPlayer = (input) => {
        startingPlayer = input;
    };

    let result = undefined;
    const getResult = () => {
        return result;
    };

    let gameActive = true;
    const getActive = () => {
        return gameActive;
    };

    let previousPlayer;

    const playerCheck = (item, position) => {
        currentPlayer = item;
        if (filledCount === 0){
            placeTile(item, position);
        } else if (gameActive === true && gameboard[position] === 0 && currentPlayer !== previousPlayer){
            placeTile(item, position);
        }
    };

    const placeTile = (item, position) => {
        previousPlayer = item;
        gameboard.splice(position, 1, item);
        filledCount ++;
        if (winningNumberCheck() === true){
            result = 'win';
            gameActive = false;
        }
        if (filledCount === 9 && result !== 'win'){
            result = 'draw';
            gameActive = false;
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
        gameboard.fill("", 1);
        filledCount = 0;
        gameActive = true;
        result = undefined;
    };

    return {placeTile, winningNumberCheck, getActive, getResult, resetGame, playerCheck, getGameBoard, setStartingPlayer, gameActive};
})();

gameboardObject.playerCheck('o', 1);
gameboardObject.playerCheck('x', 2);
gameboardObject.playerCheck('x', 3);
gameboardObject.playerCheck('o', 4);
gameboardObject.playerCheck('x', 5);
gameboardObject.playerCheck('o', 6);
gameboardObject.playerCheck('x', 7);
gameboardObject.playerCheck('o', 8);
gameboardObject.playerCheck('x', 9);
gameboardObject.playerCheck('o', 3);
gameboardObject.resetGame();

console.log(gameboardObject.getResult());
console.log(gameboardObject.getGameBoard());











