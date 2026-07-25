// function to make sure ID becomes 3-digit minimum
export const formatId = (id) => {
  return String(id).padStart(3, "0");
};

// func to tell weakness based on type
export const getWeakness = (types) => {
  const typeChart = {
    normal: ["fighting"],
    grass: ["flying", "poison", "bug", "fire", "ice"],
    fire: ["ground", "rock", "water"],
    water: ["electric", "grass"],
    electric: ["ground"],
    bug: ["fire", "flying", "rock"],
    flying: ["rock", "electric", "ice"],
    rock: ["fighting", "grass", "ground", "steel", "water"],
    poison: ["ground", "psychic"],
    ground: ["grass", "ice", "water"],
    ice: ["fire", "fighting", "rock", "steel"],
    fighting: ["flying", "psychic", "fairy"],
    psychic: ["bug", "ghost", "dark"],
    ghost: ["ghost", "dark"],
    dragon: ["ice", "dragon", "fairy"],
    dark: ["fighting", "bug", "fairy"],
    steel: ["fire", "fighting", "ground"],
    fairy: ["poison", "steel"],
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
