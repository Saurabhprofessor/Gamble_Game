// 1.Deposite some money
// 2.Determine number of line to bet
// 3.collect the bet amount
// 4.spin the slot machine
// 5.check if user is win
// 6.give the user their winnings
// 7.play again 


const prompt = require("prompt-sync")();

const Rows = 3;
const Cols = 3;

const symbol_Count = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const Symbol_Value = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};


const deposit = () => {

    while (true) {
        const depositAmount = prompt("Enter the deposite amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("invalid deposite amount ,try again");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberLine = () => {
    while (true) {
        const line = prompt("Enter the number of line to bet (1-3): ");
        const numberOfLine = parseInt(line);

        if (isNaN(numberOfLine) || numberOfLine <= 0 || numberOfLine > 3) {
            console.log("invalid number line, plz try again. ");
        } else {
            return numberOfLine;
        }
    }
};

const getBet = (balance, line) => {
    while (true) {
        const bet = prompt("Enter the Amount per line Bet: ");
        const numberBet = parseInt(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / line) {
            console.log("invalid Amount of Bet , plz try again. ");
        } else {
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbol_Count)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];

    for (let i = 0; i < Cols; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < Rows; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < Rows; i++) {
        rows.push([]);
        for (let j = 0; j < Cols; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "

            }
        }
        console.log(rowString)
    }
};

const getWinnings = (rows, bet, line) => {
    let winning = 0;

    for (let row = 0; row < line; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winning += bet * Symbol_Value[symbols[0]];
        }
    }

    return winning;
}

const game = () => {
    let balance = deposit();
    // console.log(depositAmount); 

    while (true) {
        console.log("you have a balance of $" + balance);
        const numberOfLine = getNumberLine();

        const bet = getBet(balance, numberOfLine);
        balance -= bet * numberOfLine;

        const reels = spin();
        // console.log(reels);

        const rows = transpose(reels);

        printRows(rows);

        const winning = getWinnings(rows, bet, numberOfLine);
        balance += winning;
        console.log("you won , $" + winning.toString());

        if (balance <= 0) {
            console.log("you ran out your money!");
            break;
        }

        const playagain = prompt("do you want to play again(y/n)? ");

        if (playagain != "y") break;
    }
};

game();
