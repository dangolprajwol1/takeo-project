import styled from "@emotion/styled";

export const Header = styled("header")((props) => ({
  background: "#ffffff",
  position: "sticky",
  top: "0",
  zIndex: "999",

  "& .MuiGrid-root": {
    alignItems: "center",
  },
  "& .MuiGrid-root .MuiGrid-item": {
    padding: "0",
    // paddingTop: "0",
    paddingLeft: "1.5rem",
  },
}));

export const Navigation = styled("nav")((props) => ({
  "& ul": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& li": {
      fontWeight: "400",
      fontSize: "1.25rem",
      width: "auto",
    },
    "& li a": {
      textDecoration: "none",
      transition: "0.3s",
      position: "relative",

      "&::after": {
        content: '" "',
        position: "absolute",
        width: "100%",
        height: "3px",
        background: "#E45C32",
        bottom: "0",
        left: "0",
        opacity: "0",
        transition: "0.3s",
      },
      "&:hover": {
        color: "#E45C32",
      },
      "&:hover::after": {
        opacity: "1",
      },
    },
  },
}));

export const Logo = styled("div")((props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "& p": {
    background: "#E45C32",
    borderRadius: "0.35rem",
    color: "#fff",
    padding: "0.5rem",
    fontSize: "1.5rem",
    fontWeight: "200",
  },
  "& span": {
    marginLeft: "0.25rem",
    fontSize: "2rem",
  },
}));

export const UserWrap = styled("div")((props) => ({
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  alignItems: "center",
  "& .MuiBadge-badge": {
    background: "#E45C32",
  },
}));
