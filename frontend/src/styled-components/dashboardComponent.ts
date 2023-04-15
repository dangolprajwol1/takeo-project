import styled from "@emotion/styled";
import { Paper, Box, Button } from "@mui/material";

export const DashboardWrap = styled("section")((props) => ({
  marginTop: "2rem",
}));

export const Heading = styled("h3")((props) => ({
  fontSize: "1.3rem",
  margin: "0",
  color: "#363540",
  fontWeight: "400",
}));

export const Span = styled("span")((props) => ({
  fontSize: "0.75rem",
  color: "#C4C3C6",
}));
export const ContentWrap = styled("div")((props) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  "&::after": {
    content: '" "',
    position: "absolute",
    top: "0",
    left: "0",
    background: props.color,
    height: "100%",
    width: "0.5rem",
    borderRadius: "0.8rem",
  },
}));
export const ButtonWrap = styled("div")((props) => ({
  width: "75%",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
}));

export const GridTitle = styled("h2")((props) => ({
  fontSize: "2rem",
  color: "#363540",
  letterSpacing: "0.1rem",
  fontWeight: "600",
  position: "relative",
  cursor: "pointer",
  width: "max-content",
  "&::after": {
    content: '" "',
    position: "absolute",
    bottom: "-3px",
    left: "0",
    background: "#1976d235",
    height: "0.25rem",
    width: "100%",
    opacity: "0",
  },
  "&:hover::after": {
    opacity: "1",
  },
}));

export const TodoPaper = styled(Paper)((props) => ({
  //   background: "green",
  //   "& .css-1qyqnox:nth-child(2) div::after": {
  //     background: "purple",
  //   },
  cursor: "pointer",
  "&:hover :last-child": {
    opacity: "1",
  },
}));

export const TodoPaperRight = styled(Paper)((props) => ({
  //   background: "green",
  //   "& .css-1qyqnox:nth-child(2) div::after": {
  //     background: "purple",
  //   },
  cursor: "pointer",
  padding: "0",
  paddingLeft: "0.5rem",
  paddingBottom: "0.5rem",
  "& :first-child": {
    marginTop: "4px",
  },
  "& span": {
    color: "#C47689",
    fontWeight: "600",
    letterSpacing: "0.1rem",
  },
}));

export const TodoBox = styled(Box)((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export const TodoButton = styled(Button)(({ colors }: { colors: string }) => ({
  background: "#ffffff",
  fontWeight: "600",
  color: colors,
  borderRadius: "1rem",
  borderColor: "#ffffff",
  "&:hover": {
    borderColor: "#ffffff",
  },
}));
