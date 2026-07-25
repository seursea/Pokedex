import { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'

export default function Home() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [visibleDetails, setVisibleDetails] = useState([]);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
                const data = await res.json();

                const processedList = data.results.map((pokemon, index) => ({
                    ...pokemon,
                    id: index + 1
                }));
                setAllPokemon(processedList);
            } catch (error) {
                console.error("Sorry :( Failed to fectch the Pokemon list: ", error);
            }
        };
        fetchAll();
    }, []);

    useEffect(() => {
        if (allPokemon.length === 0) return;

        let filtered = allPokemon.filter(pokemon => 
            pokemon.name.includes(searchTerm.toLowerCase()) || 
            pokemon.id.toString() === searchTerm
        );

        if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            filtered.sort((a, b) => a.id - b.id)
        }

        const page = filtered.slice(0, limit);

        const fetchDetails = async () => {
            try {
                const promises = page.map(pokemon => 
                    fetch(pokemon.url).then(res => res.json())
                );

                const results = await Promise.all(promises);
                setVisibleDetails(results);
            } catch (error) {
                console.error("Sorry :( Failed to fectch the Pokemon list: ", error);
            }
        };
        fetchDetails();
    }, [allPokemon, searchTerm, sortBy, limit]);

    return(
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
                <input 
                    type="text"
                    placeholder="Search by Name or ID"
                    className="p-2 border rounded shadow-sm flex-1"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border rounded shadow-sm"
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {visibleDetails.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => setLimit(prev => prev + 10)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-full duration-300 hover:bg-blue-600 transition"
                >
                    Load More
                </button>
            </div>
        </div>
    );
}