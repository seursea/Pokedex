import { Link } from 'react-router-dom'
import { formatId } from '../utils'

export default function PokemonCard({ pokemon }) {
    const formattedId = formatId(pokemon.id);
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;
    
    console.log(pokemon)
    return (
        <Link to={`/pokemon/${pokemon.id}`}>
            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:-translate-y-1 transition">
                <span className="text-gray-400 font-bold self-start">#{formattedId}</span>
                <img src={imageUrl} alt={pokemon.name} className="w-32 h-32 object-contain" /> 
                <h2 className="capitalize text-xl font-bold mt-2">{pokemon.name}</h2>
                <div className="flex gap-2 mt-2">
                    {pokemon.types.map(t => (
                        <span key={t.type.name} className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize">
                            {t.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}