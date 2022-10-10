const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonImageShy = document.querySelector('.pokemon__image');
const pokemonHp = document.querySelector('.pokemon__hp');
const pokemonAtk = document.querySelector('.pokemon__atk');
const pokemonDef= document.querySelector('.pokemon__def');
const pokemonType = document.querySelector('.pokemon__type');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonShy = document.querySelector('.btn-shiny');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
let shiny = false;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    console.log(data);
    return data;
  }
}

buttonShy.addEventListener('click', () => {
  if(shiny == true){
    shiny = false;
    renderPokemon(searchPokemon);
  } else{
    shiny = true;
    renderPokemon(searchPokemon);
  }

});

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    if(shiny == false){
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }else{
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
    }
    pokemonHp.innerHTML = data.stats[0].base_stat;
    pokemonAtk.innerHTML = data.stats[1].base_stat;
    pokemonDef.innerHTML = data.stats[2].base_stat;
    pokemonType.innerHTML = data.types[0].type.name;
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});


buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon);
