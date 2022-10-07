import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';
import { Box, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteContext } from '../../favorites/contexts/FavoriteContext';
import { useContext } from 'react';
import '../../styles/styles.css';

interface PokedexCardProps {
  pokemon: PokemonDetail;
}

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {

  const { favorites, setFavorites } = useContext(FavoriteContext);

  const navigate = useNavigate()

  const addPokemontoFavorites = () => {
    setFavorites([...favorites, pokemon])
  }

  const removePokemonFromFavorite = () => {
    setFavorites(favorites.filter((poke) => poke.name !== pokemon.name))
  }

  const isFavorite = favorites.some((poke) => poke.name === pokemon.name)

  // console.log(pokemon)

  const PokemonName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
  const typePoke = pokemon.types.map((type) => type.type.name);

  return (
      <Card
        className={`card-container ${typePoke[0]}`}
        sx={{ maxWidth: 345,
          background: `url(${pokemon.sprites.front_default})`
        }} >
        <CardContent className="card-content" onClick={() => { navigate(`/pokemon/${pokemon.name}`)}}>
          <Typography sx={{fontSize: "1.2em"}} variant="h5" color="white">
             {PokemonName}
          </Typography>
          
            {pokemon.types.map((type) => (
              <Box className="chip-box" display="flex">
                <Chip className="chip" label={type.type.name} sx={{ backgroundColor: "#ffffff42", color: "white" }} />   
              </Box>      
            ))}
          
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => isFavorite ? removePokemonFromFavorite() : addPokemontoFavorites()} aria-label="add to favorites">
            <FavoriteIcon color={isFavorite ? 'error' : 'disabled'} />
          </IconButton>
        </CardActions>
      </Card>
  );
};
