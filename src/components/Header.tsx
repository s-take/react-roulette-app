import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <AppBar
      position="absolute"
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" color="inherit" noWrap>
          担当者決めアプリ
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
