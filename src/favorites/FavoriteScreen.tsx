import React from 'react'
import { useContext } from 'react';
import { AppBarComponent } from '../components/statics/AppBar';
import { Box, Container, Grid } from '@mui/material';
import { PokedexCard } from '../pokedex/components/PokedexCard';
import { FavoriteContext } from './contexts/FavoriteContext';

interface FavoriteScreenProps {

}

export const FavoriteScreen: React.FC<FavoriteScreenProps> = () => {

  const { favorites } = useContext(FavoriteContext);

  return (
    <div>
       <AppBarComponent />
      <Container maxWidth="lg">
        <Box mt={10}>
          <Grid container spacing={2}>
            {favorites?.map((pokemon) => (
              <Grid xs={6} lg={3}>
                <PokedexCard pokemon={pokemon} />
              </Grid>))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};