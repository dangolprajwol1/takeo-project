import { Box, Container, Grid, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  ModalFormWrap,
  ModalHeader,
} from "../../styled-components/modalComponent";
import { useEffect, useState } from "react";

const TodoModal = (props: any) => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <ModalHeader>
        <DialogTitle>Add Task Title</DialogTitle>
        <Button onClick={props.handleClose}>Cancel</Button>
      </ModalHeader>
      <DialogContent>
        <ModalFormWrap>
          <TextField
            id="outlined-basic"
            label="Task Title"
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Task Deadline"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Button
            variant="contained"
            onClick={props.handleClose}
            sx={{ mt: 3 }}
          >
            Add Task Title
          </Button>
        </ModalFormWrap>
      </DialogContent>
    </Dialog>
  );
};

export default TodoModal;
