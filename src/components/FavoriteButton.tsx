import { useNavigate } from "react-router-dom";
import { Badge, Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext } from "react";
import { FavoriteContext } from "../favorites/contexts/FavoriteContext";


interface FavoriteButtonProps {
//   back?: boolean;
//   isRefetching?: boolean;
//   pagePokemon?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = () => {

  const { favorites } = useContext(FavoriteContext);

  const navigate = useNavigate()

  return (
    <>
    <Box onClick={() => {navigate('/favorites')}} sx={{ flexGrow: 1 }}>
            <Badge badgeContent={favorites.length} color="secondary">
              <FavoriteIcon/>
            </Badge>
      </Box>
    </>
  )
}