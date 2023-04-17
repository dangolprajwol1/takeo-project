import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ModalHeader = styled(Box)((props) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const ModalFormWrap = styled("form")((props) => ({
  display: "flex",
  //   flexDirection: "column",
  flexWrap: "wrap",
  gap: "1rem",

  "& > div": {
    margin: "0.5rem 0",
  },
}));
