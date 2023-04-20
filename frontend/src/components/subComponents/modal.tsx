import { Box, Container, Grid, Button, Snackbar, Alert } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import {
  ModalFormWrap,
  ModalHeader,
} from "../../styled-components/modalComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateTask, EditTask, GetTask } from "../../store/slice/taskSlice";
import Loader from "./loader";
import SnackBar from "./snackbar";
import { EditTaskData } from "../../services/taskTypes";

const TodoModal = (props: any) => {
  const dispatch = useDispatch<any>();
  const currentUser = useSelector<any, any>((state) => state.users);
  const currentUserTasks = useSelector<any, any>((state) => state.tasks);
  const [date, setDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");
  const [openmessage, setOpenmessage] = useState(false);

  const handleCloses = () => {
    setOpenmessage(false);
  };
  const addTask = async (e: any) => {
    e.preventDefault();

    if (!title || !date) {
      return;
    }
    const taskData = { title, expiry: date, user: currentUser.userId };
    const edittaskData: EditTaskData = {
      title,
      expiry: date,
      taskId: props.taskToEdit,
    };

    const data = props.taskToEdit.trim()
      ? await dispatch(EditTask(edittaskData))
      : await dispatch(CreateTask(taskData));

    if (data.payload.success) {
      dispatch(GetTask(currentUser.userId));
      setOpenmessage(true);
      props.handleClose();
      if (!props.taskToEdit) {
        setTitle("");
        setDate(null);
      }
    }
  };
  useEffect(() => {
    if (props.taskToEdit.trim()) {
      const tasktobeEdited = currentUserTasks.userTasks.find(
        (item: any) => item._id === props.taskToEdit
      );
      setTitle(tasktobeEdited.title);
      setDate(new Date(tasktobeEdited.expiry));
    } else {
      setTitle("");
      setDate(null);
    }
  }, [props.taskToEdit]);
  return (
    <>
      <SnackBar
        openmessage={openmessage}
        handleCloses={handleCloses}
        message={
          props.taskToEdit.trim()
            ? "Task Updated Successfully"
            : "Task Added Successfully"
        }
      />
      <Dialog open={props.open} onClose={props.handleClose}>
        <Loader loader="tasks" />
        <ModalHeader>
          <DialogTitle>Add Task Title</DialogTitle>
          <Button onClick={props.handleClose}>
            <CloseIcon />
          </Button>
        </ModalHeader>
        <DialogContent>
          <ModalFormWrap onSubmit={addTask}>
            <TextField
              id="outlined-basic"
              label="Task Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DemoContainer
                sx={{ paddingTop: "0" }}
                components={["DateTimePicker"]}
              >
                <DateTimePicker
                  label="Task Deadline"
                  value={date}
                  minDate={new Date()}
                  onChange={(newValue) => setDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>

            <Button
              variant="contained"
              type="submit"
              // onClick={props.handleClose}
              sx={{ mt: 3 }}
            >
              {props.taskToEdit.trim() ? "Edit Task Title" : "Add Task Title"}
            </Button>
          </ModalFormWrap>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoModal;
