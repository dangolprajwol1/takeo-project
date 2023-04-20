import { Snackbar, Alert } from "@mui/material";

const SnackBar = (props: any) => {
  return (
    <Snackbar
      open={props.openmessage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={5000}
      onClose={props.handleCloses}
    >
      <Alert
        onClose={props.handleCloses}
        severity="success"
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
