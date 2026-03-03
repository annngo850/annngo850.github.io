// constants and dom. i put all of them in a const element so it's much easier to see/organize
let selectedPokemon = null;
let teamList = [];
const pokemonCache = {};

const elements = {
  input: document.getElementById("input"), search: document.getElementById("search"), add: document.getElementById("add"),
  status: document.getElementById("status"), image: document.getElementById("pokeimage"), name: document.getElementById("name"),
  audio: document.getElementById("cry"), team: document.getElementById("team"), count: document.getElementById("count"),
  
  // the moves
  moves: [
    document.getElementById("move1"),
    document.getElementById("move2"),
    document.getElementById("move3"),
    document.getElementById("move4")
  ]
};
// allows the user to click on the search button and add it into the team 
elements.search.addEventListener("click", searchpkmn);
elements.add.addEventListener("click", addpkmn);
async function searchpkmn() {
// helps with searching and spaces/case sensitive
  const query = elements.input.value.trim().toLowerCase();
  if (!query) return;

  display("Loading...");
  elements.add.disabled = true;
// fetches the poemon data 
  try {
    const data = await getPokemonData(query);
    showpkmn(data);
  } catch {
    error();
  }
}
// searches for the pokemon within the api database. 
async function getPokemonData(nameOrId) {
  if (pokemonCache[nameOrId]) return pokemonCache[nameOrId];
// helps with cache times
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
  );
  // throws if the pokemon doesnt exist
  if (!response.ok) throw new Error("Not found");
  const data = await response.json();
  pokemonCache[nameOrId] = data;
  return data;
}
// shows the pokemon 
function showpkmn(data) {
  selectedPokemon = data;
// displays name of pokemon
  elements.name.textContent = data.name;
  elements.image.src = data.sprites.front_default || "";
// displays cry
  loadcry(data);
  showmoves(data.moves);
  elements.status.textContent = "";
  elements.add.disabled = false;
}

function loadcry(data) {
  const cry = data.cries?.latest || data.cries?.legacy || "";
  elements.audio.src = cry;
  if (cry) elements.audio.load();
}

function showmoves(moveData) {
  const moveNames = moveData.map(m => m.move.name);
  elements.moves.forEach(select => {
    select.innerHTML = `<option value="">Select Move</option>`;
    moveNames.forEach(move => {
      const option = document.createElement("option");
      option.value = move;
      option.textContent = move;
      select.appendChild(option);
    });
  });
}
// resets the display 
function display(message) {
  selectedPokemon = null;
  elements.name.textContent = message;
  elements.image.src = ""; elements.audio.src = "";
}

// shows error message if pokemon isnt in the database
function error() {
  display("—");
  elements.status.textContent =
    "Pokemon not found.";
}
// adds whatever selected pokemon the user inputs
function addpkmn() {
  if (!selectedPokemon) return;
  if (teamList.length >= 6) {
    elements.status.textContent = "Team is full!";
    return;
  }

  const selectmoves = elements.moves
    .map(select => select.value)
    .filter(move => move !== "");

  teamList.push({
    name: selectedPokemon.name, sprite: selectedPokemon.sprites.front_default, moves: selectmoves
  });

  renderTeam();
}

function renderTeam() {
  elements.team.innerHTML = "";
  elements.count.textContent = `(${teamList.length}/6)`;

  if (teamList.length === 0) {
    elements.team.innerHTML =
      `<div class="empty-message">Catch Em All!</div>`;
    return;
  }

  teamList.forEach((pokemon, index) => {
    elements.team.appendChild(create(pokemon, index));
  });
}

function create(pokemon, index) {
  const card = document.createElement("div"); card.className = "teamcard";
// adds the image of pokemon
  if (pokemon.sprite) {
    const img = document.createElement("img");
    img.src = pokemon.sprite; img.alt = pokemon.name;
    card.appendChild(img);
  }
  // shows info on the moves
  const info = document.createElement("div");
  info.className = "teamcard-info";
  const name = document.createElement("div");
  name.className = "teamcard-name";
  name.textContent = pokemon.name;
  info.appendChild(name);

  if (pokemon.moves.length > 0) {
    const ul = document.createElement("ul");
    ul.className = "teamcard-moves";

    pokemon.moves.forEach(move => {
      const li = document.createElement("li");
      li.textContent = move;
      ul.appendChild(li);
    });
    info.appendChild(ul);
  }

  card.appendChild(info);
// the remove button
  const remove = document.createElement("button");
  remove.className = "teamcard-remove";
  remove.textContent = "Remove";
  remove.addEventListener("click", () => {
    teamList.splice(index, 1);
    renderTeam();
  });

  card.appendChild(remove);

  return card;
}
