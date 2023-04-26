import {
  Box,
  Container,
  Grid,
  Button,
  Checkbox,
  ButtonGroup,
  Tooltip,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import formatDistance from "date-fns/formatDistance";
import {
  ButtonWrap,
  ContentWrap,
  GridTitle,
  Heading,
  Span,
  TodoPaper,
} from "../../styled-components/dashboardComponent";
import TodoModal from "./modal";
import { useDispatch, useSelector } from "react-redux";
import { CompleteTaskData, UserTasks } from "../../services/taskTypes";
import { CompleteTask, GetTask } from "../../store/slice/taskSlice";
import Loader from "./loader";
import Confirmation from "./deleteConfirmation";
const TaskSidebar = (props: any) => {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const userTask = useSelector<any, any>((state) => state.tasks);
  const currentUser = useSelector<any, any>((state) => state.users);
  const color: string[] = ["#1976d2", "#E45C32", "#1FBEC1"];
  const [taskToEdit, setTaskToEdit] = useState("");
  const dispatch = useDispatch<any>();

  const updateComplete = async (e: any, payload: boolean) => {
    const dataToSend: CompleteTaskData = {
      completed: !payload,
      taskId: e.target.value,
    };
    const data = await dispatch(CompleteTask(dataToSend));
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
    setOpen(true);
    if (action === "add") {
      setTaskToEdit("");
      return;
    }

    setTaskToEdit(payload);
  };

  const handleClose = () => {
    setOpenConfirm(false);
    setOpen(false);
    setTaskToEdit("");
  };
  return (
    <Grid item md={3.5} sm={6} xs={12}>
      <GridTitle> {props.title}</GridTitle>
      <Loader loader="tasks" />
      {userTask.userTasks.length === 0 && <p> No Task to Display</p>}
      {userTask.userTasks.length > 0 &&
        userTask.userTasks.map((task: UserTasks, index: number) => {
          {
            // reset index for color
            index > 2 ? (index = index % 3) : 0;
          }
          return (
            <TodoPaper
              sx={{
                my: "1rem",
                p: "0.75rem",
                borderRadius: "0.85rem",
                background: task.completed ? color[index] : "",
              }}
              key={task._id}
            >
              <ContentWrap color={color[index]}>
                <Box ml={2} key={task._id}>
                  <Tooltip
                    title={`${task.title} ( added ${formatDistance(
                      new Date(task.created),
                      Date.now(),
                      {
                        addSuffix: true,
                      }
                    )} )`}
                  >
                    <Heading completed={task.completed}>
                      {" "}
                      {`${task.title.substring(0, 8)}...`}{" "}
                    </Heading>
                  </Tooltip>
                  <Span> {`${task.todos.length} tasks`} </Span>
                </Box>
                <Box
                  sx={{
                    opacity: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: "1",
                    // "& > span.Mui-checked": {
                    //   color: task.completed ? "#ffffff" : color[index],
                    // },
                    "& > span:has(input:checked)": {
                      color: task.completed ? "#ffffff" : color[index],
                    },
                    "& > span": {
                      color: color[index],
                    },
                  }}
                >
                  <Checkbox
                    disableRipple
                    edge="end"
                    sx={{
                      color: "gray",
                      padding: "0",
                      margin: "0",
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: "0.5rem",
                    }}
                    value={task._id}
                    checked={task.completed}
                    onChange={(e) => updateComplete(e, task.completed)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <ModeEditIcon
                    sx={{ color: task.completed ? "#ffffff" : color[index] }}
                    onClick={() => handleClickOpen("edit", task._id)}
                  />
                  <DeleteIcon
                    sx={{
                      fontSize: 30,
                      color: task.completed ? "#ffffff" : color[index],
                    }}
                    onClick={() => handleClickOpen("delete", task._id)}
                  />
                </Box>
              </ContentWrap>
            </TodoPaper>
          );
        })}

      <ButtonWrap>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: 50 }} />}
          sx={{
            width: 4 / 4,
            height: "3rem",

            borderRadius: "0.5rem",
          }}
          onClick={() => handleClickOpen("add", "")}
        >
          Add New Task
        </Button>
      </ButtonWrap>
      <TodoModal
        open={open}
        handleClose={handleClose}
        taskToEdit={taskToEdit}
      />
      <Confirmation
        open={openConfirm}
        handleClose={handleClose}
        taskToEdit={taskToEdit}
        deleteType="taskTitle"
      />
    </Grid>
  );
};

export default TaskSidebar;
