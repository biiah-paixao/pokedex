import { Box, IconButton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AppBarComponent } from '../components/statics/AppBar';
import { FavoriteContext } from '../favorites/contexts/FavoriteContext';
import { getPokemonDetails } from './services/getPokemonDetails';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface PokemonDetailsProps {

}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {

    const { name } = useParams();

    const { data } = useQuery([`getPokemonDetails-${name}`], () => getPokemonDetails(`${name}`) )
    const selectedPokemonDetails = data;

    const { favorites, setFavorites } = useContext(FavoriteContext);

    const addPokemontoFavorites = () => {
      if(!selectedPokemonDetails) return;
      setFavorites([...favorites, selectedPokemonDetails])
    }

    const removePokemonFromFavorite = () =>  {
      if(!selectedPokemonDetails) return;
      setFavorites(favorites.filter((poke) => poke.name !== selectedPokemonDetails.name));
    }

    const isFavorite = favorites.some((poke)=> poke.name === selectedPokemonDetails?.name);

  return (
    <div>
        <AppBarComponent back={true} />
        
        <Box mt={2}>
          <img src={selectedPokemonDetails?.sprites.front_default} alt="" />
        </Box>
        <Typography variant='h2'>
          {selectedPokemonDetails?.name}
          <IconButton onClick={() => isFavorite ? removePokemonFromFavorite() : addPokemontoFavorites()} aria-label="add to favorites">
          <FavoriteIcon color={isFavorite ? 'error' : 'disabled'}/>
        </IconButton>
        </Typography>
        <Box display="flex" flexDirection='row'>
        <Typography>
          Espécies: 
        </Typography>
        <Typography>
          {selectedPokemonDetails?.species.name}
        </Typography>
        </Box>

        <Box display="flex" flexDirection='row'>
        <Typography>
          Altura: 
        </Typography>
        <Typography>
           {selectedPokemonDetails?.height}
        </Typography>
        </Box>

        <Box display="flex" flexDirection='row'>
        <Typography>
          Peso: 
        </Typography>
        <Typography>
          {selectedPokemonDetails?.weight}        
        </Typography>
        </Box>

        <Box display="flex" flexDirection='row'>
        <Typography>
        {selectedPokemonDetails?.abilities.map((ability) => <Typography>{ability.ability.name}</Typography>)}     
        </Typography>
        </Box>

          {/* <h2>Pokemon Selecionado: {selectPokemon?.name || "Nenhum Pokemon Selecionado"}</h2> */}
          {JSON.stringify(selectedPokemonDetails, undefined, 2)}
          
    </div>
  )
}