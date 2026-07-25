import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-black-100 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">Pokedex</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;