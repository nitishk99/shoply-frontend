"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const router = useRouter();

  // Removed unused 'event' parameter
  const handleMenu = () => {
    // Implement menu logic if needed
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/home"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          My Ecommerce
        </Typography>
        <IconButton component={Link} href="/home/checkout" color="inherit">
          <Badge badgeContent={cartCount} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="logout"
          sx={{ ml: 2 }}
          onClick={handleLogout}
        >
          <LogoutIcon />
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 2, display: { md: "none" } }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};