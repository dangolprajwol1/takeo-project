import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const FormWrap = styled("form")((props) => ({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  gap: "1rem",

  "& > div": {
    margin: "0.5rem 0",
  },
}));
