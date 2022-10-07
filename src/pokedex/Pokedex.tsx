import React from "react";
import { AppBarComponent } from "../components/statics/AppBar";
import { PokedexCard } from "./components/PokedexCard"

import {
  Container,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useQuery } from "@tanstack/react-query";
import { listPokemons } from "../pokemon/services/listPokemons";

interface PokedexProps { }

export const Pokedex: React.FC<PokedexProps> = () => {
 
  const { data, isLoading, isRefetching } = useQuery(['pokemons'], listPokemons)

  return (
    <div>
      <AppBarComponent isRefetching={isRefetching} page={'home'}/>

      <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{ ml: 2, fontWeight: "600" }}>
            Pokedex
      </Typography>
      {!isLoading ? (
        <Box mt={4}>
          <Grid container spacing={2}>
            {data?.results.map((pokemon) => (
              <Grid xs={6} md={4} lg={3}>
                <PokedexCard pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <div style={{textAlign:"center"}}><CircularProgress /></div>
      )}
      </Container>
    </div>
  );
};
