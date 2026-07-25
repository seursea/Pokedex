import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-[#242424] p-4 md:p-8">
      <h1 className="text-6xl font-bold text-center text-[#08ac94] my-4">Pokédex</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;