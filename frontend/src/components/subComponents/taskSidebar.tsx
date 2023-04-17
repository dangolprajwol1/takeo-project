import { Box, Container, Grid, Button, ButtonGroup } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
  ButtonWrap,
  ContentWrap,
  GridTitle,
  Heading,
  Span,
  TodoPaper,
} from "../../styled-components/dashboardComponent";
import TodoModal from "./modal";

const TaskSidebar = (props: any) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid item md={3.5} sm={6} xs={12}>
      <GridTitle> {props.title}</GridTitle>
      <TodoPaper
        sx={{
          my: "1rem",
          p: "0.75rem",
          borderRadius: "0.85rem",
        }}
      >
        <ContentWrap color="#1976d2">
          <Box ml={2}>
            <Heading> General</Heading>
            <Span> 8 tasks</Span>
          </Box>
          <Box sx={{ opacity: "0" }}>
            <ModeEditIcon sx={{ fontSize: 30, color: "gray" }} />
          </Box>
        </ContentWrap>
      </TodoPaper>
      <TodoPaper
        sx={{
          my: "1rem",
          p: "0.75rem",
          borderRadius: "0.85rem",
        }}
      >
        <ContentWrap color="#E45C32">
          <Box ml={2}>
            <Heading> General</Heading>
            <Span> 8 tasks</Span>
          </Box>
          <Box sx={{ opacity: "0" }}>
            <ModeEditIcon sx={{ fontSize: 30, color: "gray" }} />
          </Box>
        </ContentWrap>
      </TodoPaper>
      <TodoPaper
        sx={{
          my: "1rem",
          p: "0.75rem",
          borderRadius: "0.85rem",
        }}
      >
        <ContentWrap color="#1FBEC1">
          <Box ml={2}>
            <Heading> General</Heading>
            <Span> 8 tasks</Span>
          </Box>
          <Box sx={{ opacity: "0" }}>
            <ModeEditIcon sx={{ fontSize: 30, color: "gray" }} />
          </Box>
        </ContentWrap>
      </TodoPaper>
      <ButtonWrap>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: 50 }} />}
          sx={{
            width: 4 / 4,
            height: "3rem",

            borderRadius: "0.5rem",
          }}
          onClick={handleClickOpen}
        >
          Add New Task
        </Button>
      </ButtonWrap>
      <TodoModal open={open} handleClose={handleClose} />
    </Grid>
  );
};

export default TaskSidebar;
