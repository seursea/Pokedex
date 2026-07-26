import { Link } from 'react-router-dom'
import { formatId } from '../utils'

export default function PokemonCard({ pokemon }) {
    const formattedId = formatId(pokemon.id);
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;
    
    console.log(pokemon)
    return (
        <Link to={`/Pokedex/pokemon/${pokemon.id}`}>
            <div className="border border-[#08ac94] shadow-md p-4 flex flex-col items-center hover:-translate-y-1 transition">
                <span className="text-[#F4FBFA] font-bold self-start">#{formattedId}</span>
                <div className="w-32 h-32 flex items-center text-[#F4FBFA] justify-center">
                    <img
                        src={imageUrl}
                        alt={pokemon.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <h2 className="capitalize text-xl text-[#F4FBFA] font-bold mt-2">{pokemon.name}</h2>
                <div className="flex gap-2 mt-2">
                    {pokemon.types.map(t => (
                        <span key={t.type.name} className="px-3 py-1 bg-[#b4ff10] rounded-full text-sm capitalize">
                            {t.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}