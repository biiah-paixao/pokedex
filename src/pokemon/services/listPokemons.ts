import axios from "axios";
import { PokemonDetail } from "../interfaces/PokemonDetail";
import { getPokemonDetails } from "./getPokemonDetails";

export interface PokemonListInterface {
    name: string;
    url: string;
}


interface ListPokemonsInterface {
    count: number;
    next: null | string;
    previous: null | string;
    results: PokemonDetail[]
}

export async function listPokemons(): Promise<ListPokemonsInterface>{
    const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon`;

    const response = await axios.get<ListPokemonsInterface>(endpoint);

    const promiseArr = response.data.results.map(({ name }) => getPokemonDetails(name))
    const resultsPromise = await Promise.all(promiseArr)


    //await 2 secunds to simulate a
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
        ...response.data,
        results: resultsPromise
    }
}