// Game state
let gameState = {
    followers: 0,
    faith: 0,
    gold: 0,
    power: 0,
    templeLevel: 0,
    commonFollowers: 0,
    warriorFollowers: 0,
    mysticFollowers: 0,
    shrineLevel: 0, // New building
    prestigePoints: 0, // For prestige system
    questCompleted: 0 // To track quests completed
};

// Load game state from localStorage
function loadGame() {
    const savedState = localStorage.getItem('idleCultTycoonGameState');
    if (savedState) {
        gameState = JSON.parse(savedState);
        updateUI();
    }
}

// Save game state to localStorage
function saveGame() {
    localStorage.setItem('idleCultTycoonGameState', JSON.stringify(gameState));
}

// Recruitment Functions
function recruitFollower() {
    gameState.followers += 1;
    updateUI();
    saveGame();
}

function recruitCommonFollower() {
    if (gameState.gold >= 10) {
        gameState.gold -= 10;
        gameState.commonFollowers += 1;
        gameState.followers += 1;
        updateUI();
        saveGame();
    } else {
        alert("Not enough gold to recruit a Common Follower.");
    }
}

function recruitWarriorFollower() {
    if (gameState.gold >= 50) {
        gameState.gold -= 50;
        gameState.warriorFollowers += 1;
        gameState.followers += 1;
        gameState.power += 5;
        updateUI();
        saveGame();
    } else {
        alert("Not enough gold to recruit a Warrior Follower.");
    }
}

function recruitMysticFollower() {
    if (gameState.gold >= 100) {
        gameState.gold -= 100;
        gameState.mysticFollowers += 1;
        gameState.followers += 1;
        gameState.faith += 10;
        updateUI();
        saveGame();
    } else {
        alert("Not enough gold to recruit a Mystic Follower.");
    }
}

// Ritual Function
function performRitual() {
    if (gameState.followers >= 1) {
        gameState.followers -= 1;
        gameState.faith += 10;
        updateUI();
        saveGame();
    } else {
        alert("Not enough followers to perform a ritual.");
    }
}

// Building Functions
function buildTemple() {
    if (gameState.gold >= 100) {
        gameState.gold -= 100;
        gameState.templeLevel += 1;
        updateUI();
        saveGame();
    } else {
        alert("Not enough gold to build a Temple.");
    }
}

function upgradeTemple() {
    if (gameState.gold >= 500 && gameState.templeLevel >= 1) {
        gameState.gold -= 500;
        gameState.templeLevel += 1;
        gameState.power += 10; // Increase power when upgrading
        updateUI();
        saveGame();
    } else {
        alert("Not enough gold or not enough temple level to upgrade.");
    }
}

function buildShrine() {
    if (gameState.gold >= 200) {
        gameState.gold -= 200;
        gameState.shrineLevel += 1;
        updateUI();
        saveGame();
    } else {
        alert("Not enough gold to build a Shrine.");
    }
}

// Prestige Function
function prestige() {
    if (gameState.followers >= 1000) {
        gameState.prestigePoints += 1;
        resetGame();
        alert("You have prestiged! Gain special bonuses!");
    } else {
        alert("You need at least 1000 followers to prestige.");
    }
}

// Reset Game State for Prestige
function resetGame() {
    gameState = {
        followers: 0,
        faith: 0,
        gold: 0,
        power: 0,
        templeLevel: 0,
        commonFollowers: 0,
        warriorFollowers: 0,
        mysticFollowers: 0,
        shrineLevel: gameState.shrineLevel, // Preserve shrine level
        prestigePoints: gameState.prestigePoints,
        questCompleted: 0 // Reset quests completed
    };
    updateUI();
    saveGame();
}

// Quest Function
function completeQuest() {
    gameState.questCompleted += 1;
    gameState.gold += 100;
    gameState.faith += 50;
    updateUI();
    saveGame();
}

// Update UI
function updateUI() {
    document.getElementById("followers").innerText = gameState.followers;
    document.getElementById("faith").innerText = gameState.faith;
    document.getElementById("gold").innerText = gameState.gold;
    document.getElementById("power").innerText = gameState.power;
    document.getElementById("temple-level").innerText = gameState.templeLevel;
    document.getElementById("quests-completed").innerText = gameState.questCompleted;
}

// Auto-generate resources
setInterval(() => {
    gameState.followers += gameState.templeLevel; // Followers generation rate based on temple level
    gameState.gold += gameState.templeLevel * 2; // Gold generation based on temple level
    updateUI();
    saveGame();
}, 5000); // Every 5 seconds

// Load game state on page load
window.onload = loadGame;
