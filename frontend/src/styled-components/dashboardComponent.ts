import styled from "@emotion/styled";
import { Paper, Box, Button } from "@mui/material";

export const DashboardWrap = styled("section")((props) => ({
  margin: "2rem 0",
}));

export const Heading = styled("h3")((props: any) => ({
  fontSize: "1.3rem",
  margin: "0",
  color: props.completed ? "#ffffff" : "#363540",
  fontWeight: "400",
  textDecoration: props.completed ? "line-through" : "",
  // filter: props.completed ? "blur(0.8px)" : "",
}));

export const Span = styled("span")((props) => ({
  fontSize: "0.75rem",
  color: "#C4C3C6",
}));
export const ContentWrap = styled("div")((props) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  // width: "85%",
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
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
}));

export const GridTitle = styled("h2")((props) => ({
  fontSize: "2rem",
  color: "#2C413A",
  letterSpacing: "0.1rem",
  fontWeight: "600",
  position: "relative",
  cursor: "pointer",
}));

export const TodoPaper = styled(Paper)((props) => ({
  cursor: "pointer",
  "& :first-of-type": {
    flex: "1",
  },
  "&:hover :last-child": {
    opacity: "1",
  },
}));

export const TodoPaperRight = styled(Paper)((props) => ({
  cursor: "pointer",
  padding: "0",
  // paddingLeft: "0.5rem",
  // paddingBottom: "0.5rem",
  "& :first-of-type": {
    marginTop: "4px",
  },
  "& span": {
    color: "#C47689",
    fontWeight: "600",
    letterSpacing: "0.1rem",
  },
}));

export const TodoBox = styled(Box)((props) => ({
  textAlign: "center",
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

export const TodoBoxSpaceEvenly = styled(Box)((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  marginTop: "0.5rem",
}));
export const TodoBoxSpaceBetween = styled(Box)((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingInline: "0.3rem",
}));

export const WeatherBoxInner = styled(Box)((props) => ({
  display: "flex",
  alignItems: "center",
  // justifyContent: "center",
  gap: "0.4rem",
  marginTop: "1rem",

  "& span": {
    color: "#022519",
    fontWeight: "400",
  },
}));

export const ContentWrapRight = styled("div")((props) => ({
  display: "flex",
  justifyContent: "space-around",
  padding: "0.5rem",
  // background: "#FF5E5E75",
  // borderRadius: "0.85rem",
}));
