import React, { ReactNode, useState } from 'react';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';

interface FavoriteScreenProps {
    favorites: PokemonDetail[];
    setFavorites: React.Dispatch<React.SetStateAction<PokemonDetail[]>>;
};

interface FavoriteProviderInterface{
    children: ReactNode;
}

const INITIAL_FAVORITES_VALUE: PokemonDetail[] = [];

export const FavoriteContext = React.createContext<FavoriteScreenProps>({
    favorites: INITIAL_FAVORITES_VALUE,
    setFavorites: () => console.warn('setFavorites is not ready'),

});

export const FavoriteProvider: React.FC<FavoriteProviderInterface> = ({ children }) => {
    const [favorites, setFavorites] = useState<PokemonDetail[]>(INITIAL_FAVORITES_VALUE)

    return (
        <FavoriteContext.Provider value={{
            favorites,
            setFavorites,
        }}>
        {children}
        </FavoriteContext.Provider>
    );

}

