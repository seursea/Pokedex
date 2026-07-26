import { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'

export default function Home() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [visibleDetails, setVisibleDetails] = useState([]);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Pokemons 
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
        setIsLoading(true);

        let filtered = allPokemon.filter(pokemon => 
            pokemon.name.includes(searchTerm.toLowerCase()) || 
            pokemon.id.toString() === searchTerm
        );

        if (filtered.length === 0) {
            setVisibleDetails([]);
            setIsLoading(false);
            return;
        }

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
                console.error("Sorry :( Failed to fetch the Pokemon details: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [allPokemon, searchTerm, sortBy, limit]);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const scrollDistance = document.documentElement.scrollTop;
            const totalPageHeight = document.documentElement.scrollHeight;

            if (windowHeight + scrollDistance + 1 >= totalPageHeight) {
                setLimit(limit => limit + 10);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []); 

    return(
        <div className="bg-[#242424] max-w-6xl mx-auto">
            <div className="sticky top-0 left-0 right-0 z-50 pt-3 pb-3 bg-[#242424] flex flex-col md:flex-row gap-4 mb-8 justify-between">
                <input 
                    type="text"
                    placeholder="Search by Name or ID"
                    className="p-2 border border-[#08ac94] shadow-sm flex-1 text-[#08ac94] focus:outline-2"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border border-[#08ac94] shadow-sm text-[#08ac94] focus:outline-2"
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {isLoading ? (
                    <div className="col-span-full text-center py-20 text-[#08ac94] text-xl font-bold">
                        Loading Pokémon...
                    </div>
                ) : visibleDetails.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <h2 className="text-3xl font-bold text-[#08ac94] mb-2">
                            No Pokémon found
                        </h2>
                        <p className="text-gray-400">
                            Try searching for a valid name or an ID between 1 and 1010.
                        </p>
                    </div>
                ) : (
                    visibleDetails.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))
                )}
            </div>
        </div>
    );
}