import { Box, Chip, IconButton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AppBarComponent } from '../components/statics/AppBar';
import { FavoriteContext } from '../favorites/contexts/FavoriteContext';
import { getPokemonDetails } from './services/getPokemonDetails';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

interface PokemonDetailsProps {

}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {

  const { name } = useParams();

  const { data } = useQuery([`getPokemonDetails-${name}`], () => getPokemonDetails(`${name}`))
  const selectedPokemonDetails = data;

  const { favorites, setFavorites } = useContext(FavoriteContext);

  const addPokemontoFavorites = () => {
    if (!selectedPokemonDetails) return;
    setFavorites([...favorites, selectedPokemonDetails])
  }

  const removePokemonFromFavorite = () => {
    if (!selectedPokemonDetails) return;
    setFavorites(favorites.filter((poke) => poke.name !== selectedPokemonDetails.name));
  }

  const isFavorite = favorites.some((poke) => poke.name === selectedPokemonDetails?.name);

  const poke = selectedPokemonDetails;
  const PokemonType = poke ? (poke.types[0].type.name) : null

  const PokemonName = poke ? (poke?.name[0].toUpperCase() + poke?.name.substring(1)) : null;
  
  let abilities = "";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const bla = poke ? (selectedPokemonDetails?.abilities.map((ability) => abilities += `${ability.ability.name}, `)) : null;
  abilities = abilities.substring(0, abilities.length - 2)
  console.log(poke)


  return (
    <div className={`${PokemonType}`} style={{height: "100vh", overflow: "hidden"}}>
      <AppBarComponent back={true} page={'pokemon'} />


      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between!important", marginRight: "40px" }}>
        <Typography sx={{ margin: "10px" }} variant='h4' component="h1" color="white">
          {PokemonName}
          <IconButton sx={{ color: "white" }} onClick={() => {
            isFavorite ? removePokemonFromFavorite() : addPokemontoFavorites()}} 
            aria-label="add to favorites">
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        </Typography>
        <Typography color="white" variant="h6">#00{poke?.id}</Typography>
      </Box>

      <Box sx={{ margin: "10px" }} display="flex">
        {selectedPokemonDetails?.types.map((type) => (
          <Chip className="chip" label={type.type.name} sx={{ backgroundColor: "#ffffff42", color: "white" }} />
        ))}
      </Box>

      <Box sx={{ textAlign: "center", transform: "translateY(-170px)" }}>
        <Box>
          <img style={{transform: "translateY(160px)"}} width="400" src={selectedPokemonDetails?.sprites.front_default} alt="" />
        </Box>
        <Box sx={{ height:"100vh", backgroundColor: "white", padding: "90px 20px", borderRadius: "32px 32px 0 0" }}>
          <Box display="flex" alignItems="center" flexDirection='row'>
            <Typography variant="h6" marginX={2}>
              Espécies:
            </Typography>
            <Typography>
              {selectedPokemonDetails?.species.name}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" flexDirection='row'>
            <Typography variant="h6" marginX={2}>
              Altura:
            </Typography>
            <Typography>
              {selectedPokemonDetails?.height} m
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" flexDirection='row'>
            <Typography variant="h6" marginX={2}> 
              Peso:
            </Typography>
            <Typography>
              {selectedPokemonDetails?.weight} kg
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" flexDirection='row'>
          <Typography variant="h6" marginX={2}> 
              Habilidades:
            </Typography>
            <Typography>{abilities}</Typography>
          </Box>
        </Box>
      </Box>
      {/* {JSON.stringify(selectedPokemonDetails, undefined, 2)} */}
    </div>
  )
}