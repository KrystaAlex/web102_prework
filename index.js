import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA)

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {

    for (const game of games) {
        const gameCard = document.createElement('div')
        gameCard.classList.add('game-card')

        gameCard.innerHTML = `
        <img src="${game.img}" class="game-img">
        <div>${game.name}</div>
        <div>${game.description}</div>
        `
        gamesContainer.append(gameCard)
    }

}
addGamesToPage(GAMES_JSON)

const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers;
}, 0);

contributionsCard.innerHTML = totalContributions.toLocaleString();


const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged;
}, 0);

raisedCard.innerHTML = totalRaised.toLocaleString()

const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length
console.log(totalGames)
gamesCard.innerHTML = totalGames


function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfunded  = GAMES_JSON.filter(game => game.pledged < game.goal)
    console.log("Unfunded games:", unfunded)
    addGamesToPage(unfunded)

}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const funded  = GAMES_JSON.filter(game => game.pledged >= game.goal)

    addGamesToPage(funded)
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)



const descriptionContainer = document.getElementById("description-container");


const unfundedSum = GAMES_JSON.reduce((count, game) => {
return game.pledged < game.goal ? count + 1 : count;
},0);

const newParagraph = document.createElement("p")
newParagraph.textContent = `So far, $${totalRaised.toLocaleString()} has been raised for ${totalGames} game${totalGames === 1 ? '' : 's'}. Currently, ${unfundedSum} game${unfundedSum === 1 ? '' : 's'} remain unfunded. You can help support your favorites today in only a few minutes!`;
descriptionContainer.appendChild(newParagraph)


const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [first, second] = sortedGames;

const topContainer = document.createElement("p")
topContainer.textContent = first.name
firstGameContainer.appendChild(topContainer)

const secondContainer = document.createElement("p")
secondContainer.textContent = second.name
secondGameContainer.appendChild(secondContainer)



const searchInput = document.getElementById("searchInput");

function displayGames(games) {
  gamesContainer.innerHTML = "";
  games.forEach(game => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <p>Pledged: $${game.pledged}</p>
    `;
    gamesContainer.appendChild(gameCard);
  });
}

displayGames(GAMES_JSON);

searchInput.addEventListener("input", function() {
  const query = searchInput.value.toLowerCase();
  const filteredGames = GAMES_JSON.filter(game =>
    game.name.toLowerCase().includes(query)
  );
  displayGames(filteredGames);
});