import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { MenuItem, Menu } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FavoriteButton } from "../FavoriteButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React from "react";

interface AppBarProps {
  back?: boolean;
  isRefetching?: boolean;
  page?: "pokemon" | "home";
}

export const AppBarComponent: React.FC<AppBarProps> = ({
  back,
  isRefetching,
  page,
}) => {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <IconButton
              onClick={() => {
                window.history.back();
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            

            {page === "home" ? (
              <div>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => {navigate('/favorites')}}>Favoritos</MenuItem>
              </Menu>
            </div>
            ) : (
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <FavoriteButton />
              </IconButton>
              
            )}

          </Toolbar>

          {isRefetching && (
            <LinearProgress variant="indeterminate" color="error" />
          )}
        </AppBar>
      </Box>
    </>
  );
};
