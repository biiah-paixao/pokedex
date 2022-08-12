import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';
import { Box, CardActions, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteContext } from '../../favorites/contexts/FavoriteContext';
import { useContext } from 'react';

interface PokedexCardProps { 
  pokemon:  PokemonDetail;
}

// const Card = styled.section`
//   padding: 4em;
//   border-radius: .5em;
//   background-color: papayawhip;
// `


export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {

  const { favorites, setFavorites } = useContext(FavoriteContext);

  const navigate = useNavigate()

  const addPokemontoFavorites = () => {
    setFavorites([...favorites, pokemon])
  }

  const removePokemonFromFavorite = () =>  {
    setFavorites(favorites.filter((poke) => poke.name !== pokemon.name))
  }

  const isFavorite = favorites.some((poke)=> poke.name === pokemon.name)

  return (
    <div>
       <Card 
       
       sx={{ maxWidth: 345 }}>
      <CardHeader
        title={pokemon.name}
        subheader={pokemon.types.map((type) => (
          <Box display="flex">
            <Chip label={type.type.name} variant="outlined"/>
          </Box>

        ))}
      />
      <CardMedia
        component="img"
        width="100"
        image={pokemon.sprites.front_default}
        alt="Paella dish"
        onClick={() => { navigate(`/pokemon/${pokemon.name}`)}} 
      />
      <CardActions disableSpacing>
        <IconButton onClick={() => isFavorite ? removePokemonFromFavorite() : addPokemontoFavorites()} aria-label="add to favorites">
          <FavoriteIcon color={isFavorite ? 'error' : 'disabled'}/>
        </IconButton>
      </CardActions>
    </Card>
    </div>
  );
};
