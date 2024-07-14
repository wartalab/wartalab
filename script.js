let players = []; // Array to store player objects with name and balance
let amountPerGame = 0;
const amountPerGameDisplay = document.getElementById('amountPerGame');
const boxContainer = document.getElementById('boxContainer');
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const updateButton = document.getElementById('updateButton');
const submitButton = document.getElementById('submitButton');

function updateAmountPerGame() {
    amountPerGameDisplay.textContent = `Amount per game: ${amountPerGame}`;
}

function promptAmountPerGame() {
    let input = prompt('Enter amount per game:');
    let parsedInput = parseFloat(input);
    if (isNaN(parsedInput) || parsedInput <= 0) {
        alert('Please enter a valid amount greater than 0.');
        return promptAmountPerGame(); // Prompt again recursively
    }
    return parsedInput;
}

function isNameTaken(name) {
    return players.some(player => player.name === name);
}

function createPlayerElement(player) {
    const playerElement = document.createElement('div');
    playerElement.className = 'box';
    playerElement.textContent = player.name;

    const balanceElement = document.createElement('div');
    balanceElement.className = 'balance';
    balanceElement.textContent = `Balance: $${player.balance}`;
    playerElement.appendChild(balanceElement);

    return playerElement;
}

function updatePlayerBalances() {
    document.querySelectorAll('.box').forEach((playerElement, index) => {
        playerElement.querySelector('.balance').textContent = `Balance: $${players[index].balance}`;
    });
}

window.onload = () => {
    amountPerGame = promptAmountPerGame();
    updateAmountPerGame();
};

addButton.addEventListener('click', () => {
    let playerName = prompt('Enter name for the player:');
    while (playerName && (playerName.length > 10 || isNameTaken(playerName))) {
        if (playerName.length > 10) {
            alert('Player name cannot exceed 10 characters.');
        } else {
            alert('Name already taken. Please enter a different name.');
        }
        playerName = prompt('Enter name for the player:');
    }

    if (playerName) {
        const newPlayer = { name: playerName, balance: 0 };
        players.push(newPlayer);
        const playerElement = createPlayerElement(newPlayer);
        playerElement.setAttribute('data-name', playerName); // Add data-name attribute
        boxContainer.appendChild(playerElement);
    }
});

removeButton.addEventListener('click', () => {
    const playerNameToRemove = prompt('Enter the name of the player to remove:');
    if (playerNameToRemove && isNameTaken(playerNameToRemove)) {
        players = players.filter(player => player.name !== playerNameToRemove);
        const playerElementToRemove = document.querySelector(`.box[data-name="${playerNameToRemove}"]`);
        if (playerElementToRemove) {
            boxContainer.removeChild(playerElementToRemove);
        }
    } else {
        alert('Player name not found or already removed.');
    }
});

updateButton.addEventListener('click', () => {
    const winnerName = prompt('Enter the name of the player who won:');
    if (winnerName && isNameTaken(winnerName)) {
        players.forEach(player => {
            if (player.name !== winnerName) {
                player.balance -= amountPerGame;
            }
        });
        players.find(player => player.name === winnerName).balance += amountPerGame * (players.length - 1);
        updatePlayerBalances();
    } else {
        alert('Player name not found.');
    }
});

submitButton.addEventListener('click', () => {
    players.forEach(player => {
        player.balance = 0;
    });
    updatePlayerBalances();
});