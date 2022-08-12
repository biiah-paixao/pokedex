import React from "react";
import { AppBarComponent } from "../components/statics/AppBar";
import { PokedexCard } from "./components/PokedexCard"

import {
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useQuery } from "@tanstack/react-query";
import { listPokemons } from "../pokemon/services/listPokemons";

interface PokedexProps { }

export const Pokedex: React.FC<PokedexProps> = () => {
 
  const { data, isLoading, isRefetching } = useQuery(['pokemons'], listPokemons)

  return (
    <div>
      <AppBarComponent isRefetching={isRefetching}/>
      <Container maxWidth="lg">
      {!isLoading ? (
        <Box mt={10}>
          <Grid container spacing={2}>
            Pokedex Deploy
            {data?.results.map((pokemon) => (
              <Grid xs={6} lg={3}>
                <PokedexCard pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <div><CircularProgress /></div>
      )}
      </Container>
    </div>
  );
};
