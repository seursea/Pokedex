import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { formatId, getWeakness } from '../utils'

export default function PokemonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setError(false);
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

                // manual check for 404
                if (!res.ok) {
                    throw new Error("Pokemon Not Found");
                }
                const data = await res.json();
                setPokemon(data)
            } catch (error) {
                console.error(error);
                setError(true);
            }
        }
        fetchPokemon();
    }, [id]);

    if (error) return <div className="text-center mt-20 text-[#08ac94] font-bold">Pokemon Not Found</div>;
    if (!pokemon) return <div className="text-center text-[#08ac94] mt-20">Loading...</div>;

    const formattedId = formatId(pokemon.id);
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;
    const weaknesses = getWeakness(pokemon.types)

    return (
        <div className="max-w-2xl mx-auto border-2 border-[#08ac94] shadow-lg p-8 mt-10">
            <button onClick={() => navigate('/Pokedex')} className="mb-4 text-[#08ac94] duration-300 hover:text-[#b4ff10]">
                X
            </button>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <img src={imageUrl} alt={pokemon.name} className="w-64 h-64 object-contain rounded-xl p-4" />
                <div className="flex-1">
                    <h1 className="text-4xl text-[#F4FBFA] font-bold capitalize">{pokemon.name} <span className="text-[#C4C4C4] text-2xl">#{formattedId}</span></h1>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[#C4C4C4] font-semibold">Height</p>
                            <p className="text-[#F4FBFA]">{pokemon.height / 10} m</p>
                        </div>
                        <div>
                            <p className="text-[#C4C4C4] font-semibold">Weight</p>
                            <p className="text-[#F4FBFA]">{pokemon.weight / 10} kg</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-[#C4C4C4] font-semibold mb-2">Weaknesses</p>
                        <div className="flex flex-wrap gap-2">
                            {weaknesses.map(w => (
                                <span key={w} className="px-3 py-1 bg-[#97F2E4] rounded-full text-sm capitalize">
                                    {w}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-8 pt-8 border-t border-[#08ac94]">
                <button
                    onClick={() => navigate(`/pokemon/${parseInt(id) - 1}`)}
                    disabled={pokemon.id === 1}
                    className="bg-[#C4C4C4] px-4 py-2 rounded duration-300 hover:bg-[#b4ff10] disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => navigate(`/pokemon/${parseInt(id) + 1}`)}
                    disabled={pokemon.id === 1010}
                    className="bg-[#C4C4C4] px-4 py-2 rounded duration-300 hover:bg-[#b4ff10] disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}