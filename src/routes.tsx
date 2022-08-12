import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { FavoriteScreen } from './favorites/FavoriteScreen'
import { Pokedex } from './pokedex/Pokedex'
import { PokemonDetails } from './pokemon/PokemonDetails'

interface RoutesProps{

}

export const MainRoutes: React.FC<RoutesProps> = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/favorites" element={<FavoriteScreen />} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </>
  )
}
