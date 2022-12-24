import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import KenTube, { logo } from "../utils/constant.js";
import SearchBar from "./SearchBar.jsx";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: "fixed",
      background: "#000000",
      top: 0,
      right: 0,
      left: 0,
      zIndex: 1030,
      justifyContent: "space-between",
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} />
      <KenTube />
    </Link>
    <SearchBar />
  </Stack>
);

export default Navbar;
