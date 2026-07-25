// function to make sure ID becomes 3-digit minimum
export const formatId = (id) => {
  return String(id).padStart(3, "0");
};

// func to tell weakness based on type
export const getWeakness = (types) => {
  const typeChart = {
    normal: ["rock", "steel", "fighting"],
    grass: ["flying", "poison", "bug", "fire", "grass", "steel", "dragon"],
    fire: ["ground", "rock", "water", "dragon"],
    water: ["water", "grass", "dragon"],
    electric: ["ground", "grass", "electric", "dragon"],
    bug: ["fire", "flying", "poison", "ghost", "steel", "fairy", "fighting"],
    flying: ["rock", "electric", "steel"],
    rock: ["fighting", "ground", "steel"],
    poison: ["ground", "ghost", "poison", "steel"],
    ground: ["grass", "flying", "bug"],
    ice: ["fire", "water", "ice", "steel"],
    fighting: ["flying", "poison", "psychic", "bug", "ghost", "fairy"],
    psychic: ["psychic", "steel", "dark"],
    ghost: ["ghost", "dark", "normal"],
    dragon: ["steel", "fairy"],
    dark: ["fighting", "dark", "fairy"],
    steel: ["fire", "fighting", "steel", "water"],
    fairy: ["poison", "steel", "fire"],
  };

  const weaknesses = new Set();

  types.forEach((typeObj) => {
    const typeName = typeObj.type.name;
    if (typeChart[typeName]) {
      typeChart[typeName].forEach((w) => weaknesses.add(w));
    }
  });

  return Array.from(weaknesses);
};
