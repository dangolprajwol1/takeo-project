import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTask, GetTask } from "../../store/slice/taskSlice";

const Confirmation = (props: any) => {
  const [task, setTask] = useState("");

  const dispatch = useDispatch<any>();
  const currentUser = useSelector<any, any>((state) => state.users);
  const currentUserTasks = useSelector<any, any>((state) => state.tasks);
  useEffect(() => {
    if (props.taskToEdit.trim() && props.deleteType === "taskTitle") {
      const tasktobeDeleted = currentUserTasks.userTasks.find(
        (item: any) => item._id === props.taskToEdit
      );

      if (Object.keys(tasktobeDeleted).length > 0) {
        setTask(tasktobeDeleted.title);
      }
    }
    if (props.taskToEdit.trim() && props.deleteType === "taskTodo") {
      const tasktobeDeleted = currentUserTasks.userTasks.map((item: any) =>
        item.todos.find((todo: any) => todo._id === props.taskToEdit)
      );
      // filter undefined values
      const realtasktobeDeleted = tasktobeDeleted.filter((task: any) => task);
      console.log(realtasktobeDeleted);
      if (realtasktobeDeleted.length > 0) {
        setTask(realtasktobeDeleted[0].description);
      }
    }
  }, [props.taskToEdit]);
  const deleteTask = async (id: string) => {
    if (!id) return;
    const deleted = await dispatch(DeleteTask(id));
    if (!deleted.payload.success) return;
    setTask("");
    dispatch(GetTask(currentUser.userId));
    props.handleClose();
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-title"
    >
      <DialogTitle id="alert-title">{`Are you sure to delete  "${task}" permanently ?`}</DialogTitle>
      <DialogActions>
        <Button onClick={() => deleteTask(props.taskToEdit)}>Yes</Button>
        <Button onClick={() => props.handleClose()}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
