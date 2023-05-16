const MAX_DEX_ID = 54;

const getRandomCity: (notThisOne?: number) => number = (
  notThisOne
) => {
  const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (pokedexNumber !== notThisOne) return pokedexNumber;
  return getRandomCity(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId = getRandomCity();
  const secondId = getRandomCity(firstId);

  return [firstId, secondId];
};