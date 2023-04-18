import {
  Box,
  Container,
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  Paper,
  InputLabel,
  FormControl,
} from "@mui/material";

import {
  DashboardWrap,
  GridTitle,
} from "../styled-components/dashboardComponent";
import TaskSidebar from "./subComponents/taskSidebar";
import NavBar from "./navbar";
import { FormWrap } from "../styled-components/taskComponent";
import RightBar from "./subComponents/taskRightbar";
const AddTask = () => {
  return (
    <>
      <NavBar />
      <main>
        <DashboardWrap>
          <Container>
            <Grid container spacing={10} rowSpacing={2}>
              <TaskSidebar title="Task Title" />
              <Grid item md={5} sm={6} xs={12}>
                <GridTitle> Add Task</GridTitle>
                <Paper
                  sx={{
                    p: "1rem",

                    borderRadius: "0.8rem",
                  }}
                >
                  <FormWrap>
                    <TextField
                      id="outlined-basic"
                      label="Task Description"
                      variant="outlined"
                    />
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Select Task
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Task"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ background: "#E45C32" }}
                      color="warning"
                    >
                      Add Task
                    </Button>
                  </FormWrap>
                </Paper>
              </Grid>
              <RightBar />
            </Grid>
          </Container>
        </DashboardWrap>
      </main>
    </>
  );
};

export default AddTask;
