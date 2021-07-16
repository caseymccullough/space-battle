const NUM_ENEMIES = 6;

// CACHED DOM NODES

const shipRow = document.getElementById("multi-ship-row");
const hullStrength = document.getElementById("player-hull-strength");
const playerShipDiv = document.getElementById("player-ship-div");

// Ship class

class Ship {
    constructor(name, hull, firepower, accuracy)
    {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    /* simulates a single battle to the death 
    between this ship and otherShip 
    @ return true  if player wins battle, false if they lose */

    battle (otherShip)
    {
        let playerDestroyed = false;
        let enemyDestroyed = false; 
        do{
            // loop while both are false
            enemyDestroyed = this.attack(otherShip);
            if (enemyDestroyed)
            {
                return true;
            }
            playerDestroyed = otherShip.attack(this);
            
            if (playerDestroyed)
            {
                return false;
            }
        }while (true);
        
    }

    /* 
    A single attack by one ship on the opposing ship
    @return true if opposing ship is destroyed, false if not. 

    */
    attack (otherShip)
    {   console.log(this.name + " fires at " + otherShip.name);
        if (Math.random() < this.accuracy)
        {
            // hit
            console.log ("It's a hit, doing " + this.firepower + " damage ");
            otherShip.hull -= this.firepower;
            if (otherShip.hull <= 0)
            {
                console.log (`${otherShip.name} is destroyed!`);
                return true; // otherShip destroyed
            }
        }
        else{
            console.log ("It's a miss!!");
        }
         return false; // otherShip not destroyed
    } // end attack()


} // END SHIP CLASS 


getRandRange = (low, high) =>
{   
    let range = high - low;
    return low + Math.random() * range;
}

generateEnemyShips = () =>
{
    let enemyShips = [];
    for (let i = 0; i < NUM_ENEMIES; i++){
        let enemyName = "Enemy Ship # " + (i + 1);
        let enemyHull = getRandRange(3, 6);
        let enemyFirePower = getRandRange(2, 4);
        let enemyAccuracy = getRandRange(0.6, 0.8);
        let newShip = new Ship (enemyName, enemyHull, enemyFirePower,enemyAccuracy);
        enemyShips.push(newShip);
    }
    return enemyShips;

}

drawEnemyShips = (numShips) => 
{
    let enemyList = document.getElementById("multi-ship-row");

    while (enemyList.hasChildNodes()) {  
        enemyList.removeChild(enemyList.firstChild);
      }

    for (let i = 0; i < numShips; i++)
    {
    
        const newShipDiv = document.createElement("div");
        newShipDiv.classList.add("enemy-div");
        newShipDiv.innerHTML = '<img src="img/enemy.jpeg" alt="an enemy ship">';
        document.getElementById("multi-ship-row").appendChild(newShipDiv);
    }
}

/* 
    @return 1 for victory
    0 for retreat,
    -1 for loss.
*/
game = () => {
    let playerShip = new Ship("USS Margaret", 20, 5, 0.7);
    let enemyShips = generateEnemyShips();

    while (enemyShips.length > 0)
    {
        // DRAW_SHIPS_ON_SCREEN
        drawEnemyShips(enemyShips.length);

        // Prompt User!!!
        var statusString = "You confront " + enemyShips.length + " enemy ships.  Do you f)ight or r)etreat?"
        
        var userAction = prompt( statusString, "f/r"); 
        if (userAction.charAt(0) === "f")
        {
            console.log("Fight on, brave warrior");
        }
        else{
            console.log ("quiting, eh? ");
            return 0;
        }

        // a singe battle vs. a single enemy ship
        currentEnemy = enemyShips.pop();
        let playerWins = playerShip.battle(currentEnemy);

        // update player's hull strength on page.
        hullStrength.innerHTML = playerShip.hull.toFixed(1);

        if (playerWins)
        {
            console.log("Enemy ship is destroyed!");
        }
        else // player loses and game is over.
        {
            console.log("Player's ship is destroyed.  You lose");
            return -1;
        }

    } // all ships must be destroyed
    return 1;

} // END GAME 


let result = game();
if (result > 0)
{
    console.log ("player wins");
    let lastShip = document.getElementById("single-ship-row");
    lastShip.parentNode.removeChild(lastShip);
}

else if (result == 0)
{
    // retreat
    console.log ("You retreat and survive to fight another day");
}
else {

    console.log ("Player loses");
    playerShipDiv.parentNode.removeChild(playerShipDiv);
    
}



