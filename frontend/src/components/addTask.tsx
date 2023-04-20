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
import { useDispatch, useSelector } from "react-redux";
import { TodoData, UserTasks } from "../services/taskTypes";
import { useState, useEffect } from "react";
import { AddTodoToTask, GetTask } from "../store/slice/taskSlice";
import SnackBar from "./subComponents/snackbar";
const AddTask = () => {
  const currentUserTask = useSelector<any, any>((state) => state.tasks);
  const user = useSelector<any, any>((state) => state.users);
  const dispatch = useDispatch<any>();
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openmessage, setOpenmessage] = useState(false);

  const handleCloses = () => {
    setOpenmessage(false);
  };
  const addTask = async (e: any) => {
    e.preventDefault();
    if (!taskTitle || !description) return;
    console.log("pass");
    const taskData: TodoData = { description, todosTitle: taskTitle };
    const data = await dispatch(AddTodoToTask(taskData));
    if (data.payload.success) {
      setOpenmessage(true);
      setTaskTitle("");
      setDescription("");
      dispatch(GetTask(user.userId));
    }
  };
  return (
    <>
      <NavBar />
      <SnackBar
        openmessage={openmessage}
        handleCloses={handleCloses}
        message=" Task Added Successfully !"
      />
      <main>
        <DashboardWrap>
          <Container>
            <Grid container spacing={10} rowSpacing={2}>
              <TaskSidebar title="Task Title" />
              <Grid item md={5} sm={6} xs={12}>
                <Box sx={{ position: "sticky", top: "15%" }}>
                  <GridTitle> Add Task</GridTitle>
                  <Paper
                    sx={{
                      p: "1rem",

                      borderRadius: "0.8rem",
                    }}
                  >
                    <FormWrap onSubmit={addTask}>
                      <TextField
                        id="outlined-basic"
                        label="Task Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">
                          Select Task
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Select Task"
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                        >
                          {currentUserTask.userTasks.map((task: UserTasks) => {
                            return (
                              <MenuItem value={task._id} key={task._id}>
                                {task.title}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{ background: "#E45C32" }}
                        color="warning"
                        type="submit"
                      >
                        Add Task
                      </Button>
                    </FormWrap>
                  </Paper>
                </Box>
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
