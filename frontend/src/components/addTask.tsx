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
import { EditTodoData, TodoData, UserTasks } from "../services/taskTypes";
import { useState, useEffect } from "react";
import {
  AddTodoToTask,
  GetTask,
  UpdateTodoTask,
} from "../store/slice/taskSlice";
import SnackBar from "./subComponents/snackbar";
import { isAfter } from "date-fns";
const AddTask = (props: any) => {
  const currentUserTask = useSelector<any, any>((state) => state.tasks);
  const user = useSelector<any, any>((state) => state.users);
  const dispatch = useDispatch<any>();
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openmessage, setOpenmessage] = useState(false);
  const [add, setAdd] = useState(true);
  const [tasktoedit, setTasktoedit] = useState("");
  const handleCloses = () => {
    setOpenmessage(false);
  };
  const addTask = async (e: any) => {
    e.preventDefault();
    if (!taskTitle || !description) return;

    const taskData: TodoData = { description, todosTitle: taskTitle };
    const edittaskData: EditTodoData = {
      description,
      todosTitle: taskTitle,
      taskId: tasktoedit,
    };
    const data = add
      ? await dispatch(AddTodoToTask(taskData))
      : await dispatch(UpdateTodoTask(edittaskData));
    if (data.payload.success) {
      setOpenmessage(true);
      setTaskTitle("");
      setDescription("");
      setTasktoedit("");
      setAdd(true);
      dispatch(GetTask(user.userId));
    }
  };

  const updateTask = (id: string) => {
    const taskToBeEditted = currentUserTask.userTasks.map((item: any) =>
      item.todos.find((todo: any) => todo._id === id)
    );
    // filter undefined values
    const realtaskToBeEditted = taskToBeEditted.filter((task: any) => task);

    if (realtaskToBeEditted.length > 0) {
      setDescription(realtaskToBeEditted[0].description);
      setTaskTitle(realtaskToBeEditted[0].todosTitle);
      setTasktoedit(id);
    }
    // setTaskTitle("");
    // setDescription("");
    setAdd(false);
  };

  // useEffect(() => {
  //   if (props.taskToEdit.trim()) {
  //     const tasktobeEdited = currentUserTasks.userTasks.find(
  //       (item: any) => item._id === props.taskToEdit
  //     );
  //     setTitle(tasktobeEdited.title);
  //     setDate(new Date(tasktobeEdited.expiry));
  //   } else {
  //     setTitle("");
  //     setDate(null);
  //   }
  // }, [props.taskToEdit]);

  return (
    <>
      <NavBar />
      <SnackBar
        openmessage={openmessage}
        handleCloses={handleCloses}
        message={
          add ? " Task Added Successfully !" : "Task Updated Successfully"
        }
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
                          {add &&
                            currentUserTask.userTasks.map((task: UserTasks) => {
                              return !task.completed &&
                                !isAfter(Date.now(), new Date(task.expiry)) ? (
                                <MenuItem value={task._id} key={task._id}>
                                  {task.title}
                                </MenuItem>
                              ) : (
                                ""
                              );
                            })}
                          {!add &&
                            currentUserTask.userTasks.map((task: UserTasks) => {
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
                        {add ? "Add Task" : "Edit Task"}
                      </Button>
                    </FormWrap>
                  </Paper>
                </Box>
              </Grid>
              <RightBar updateTask={updateTask} />
            </Grid>
          </Container>
        </DashboardWrap>
      </main>
    </>
  );
};

export default AddTask;
