import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Grid,
  List,
  ListItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridTitle } from "../../styled-components/dashboardComponent";
import { useDispatch, useSelector } from "react-redux";
import { CompleteTaskData } from "../../services/taskTypes";
import { CompleteTodoTask, GetTask } from "../../store/slice/taskSlice";
import Confirmation from "./deleteConfirmation";
const RightBar = (props: any) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState("");
  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const userTask = useSelector<any, any>((state) => state.tasks);
  const currentUser = useSelector<any, any>((state) => state.users);
  const dispatch = useDispatch<any>();
  const updateComplete = async (e: any, payload: boolean) => {
    const dataToSend: CompleteTaskData = {
      completed: !payload,
      taskId: e.target.value,
    };
    const data = await dispatch(CompleteTodoTask(dataToSend));
    if (data.payload.success) {
      dispatch(GetTask(currentUser.userId));
    }
  };
  const handleClickOpen = (action: string, payload: string) => {
    if (action === "delete") {
      setOpenConfirm(true);
      setTaskToEdit(payload);
      return;
    }

    if (action === "edit") {
      setTaskToEdit(payload);
      return;
    }

    // setTaskToEdit(payload);
  };

  const handleClose = () => {
    setOpenConfirm(false);

    setTaskToEdit("");
  };
  return (
    <Grid item md={3.5} sm={6} xs={12}>
      <GridTitle> Available Tasks</GridTitle>
      {userTask.userTasks.length === 0 && (
        <p> No Tasks To Display. Add a Task Title First</p>
      )}
      <Paper>
        {userTask.userTasks.length > 0 &&
          userTask.userTasks.map((task: any) => {
            return (
              <Accordion
                expanded={expanded === task._id}
                onChange={handleChange(task._id)}
                key={task._id}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Box>{task.title}</Box>
                </AccordionSummary>

                <AccordionDetails>
                  {task.todos.length === 0 && <p> No Tasks To Display</p>}
                  {task.todos.length > 0 && (
                    <List>
                      {task.todos.map((todo: any) => {
                        return (
                          <ListItem
                            sx={{
                              background: todo.completed ? "#4BA064" : "",
                              my: "0.5rem",
                            }}
                            key={todo._id}
                          >
                            <ListItemText
                              sx={{
                                textDecoration: todo.completed
                                  ? "line-through"
                                  : "",
                              }}
                              primary={todo.description}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <Checkbox
                                edge="end"
                                value={todo._id}
                                checked={todo.completed}
                                onChange={(e) =>
                                  updateComplete(e, todo.completed)
                                }
                                inputProps={{ "aria-label": "controlled" }}
                                sx={{
                                  color: todo.completed ? "#ffffff" : "gray",
                                }}
                              />
                              <ModeEditIcon
                                sx={{
                                  color: todo.completed ? "#ffffff" : "gray",
                                  cursor: "pointer",
                                }}
                                onClick={() => props.updateTask(todo._id)}
                              />
                              <DeleteIcon
                                sx={{
                                  fontSize: 30,
                                  color: todo.completed ? "#ffffff" : "gray",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleClickOpen("delete", todo._id)
                                }
                              />
                            </Box>
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        <Confirmation
          open={openConfirm}
          handleClose={handleClose}
          taskToEdit={taskToEdit}
          deleteType="taskTodo"
        />
      </Paper>
    </Grid>
  );
};

export default RightBar;
