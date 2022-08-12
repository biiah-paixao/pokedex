import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import UndoIcon from '@mui/icons-material/Undo';
import { useNavigate } from "react-router-dom";
import { Badge, Box, LinearProgress } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext } from "react";
import { FavoriteContext } from "../../favorites/contexts/FavoriteContext";

interface AppBarProps {
  back?: boolean;
  isRefetching?: boolean;
  pagePokemon?: boolean;
}

export const AppBarComponent: React.FC<AppBarProps> = ({back, isRefetching}) => {

  const { favorites } = useContext(FavoriteContext);

  const navigate = useNavigate()

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
        <Toolbar>
          {back ? 
          <IconButton onClick={()=> {navigate('/')}}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <UndoIcon />
          </IconButton> : null}
          <Typography onClick={() => {navigate('/')}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokedex
          </Typography>
          
          <Button color="inherit" variant="text" endIcon={
            <Badge badgeContent={favorites.length} color="secondary">
              <FavoriteIcon/>
            </Badge>
        } 
          onClick={() => {navigate('/favorites')}}>
            Favoritos
          </Button>
        </Toolbar>
        {isRefetching && <LinearProgress variant="indeterminate" color="secondary"/>}
      </AppBar>
      </Box>
    </>
  )
}