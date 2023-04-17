import { Box, Container, Button, TextField, Paper, Stack } from "@mui/material";
import { FormWrap } from "../styled-components/taskComponent";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { LoginDescription, LoginTitle } from "./login";
const Register = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      spacing={2}
    >
      <Box>
        <LoginTitle>Register New Account</LoginTitle>
      </Box>
      <Box>
        <Paper
          sx={{
            minWidth: "23rem",
            padding: "2rem",
          }}
        >
          <FormWrap>
            <TextField id="outlined-basic" label="Username" />
            <TextField id="outlined-basic" label="Email" />
            <TextField id="outlined-basic" label="Phone Number" />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              type="password"
              variant="outlined"
            />
            <Button
              variant="contained"
              size="large"
              sx={{ background: "#E45C32" }}
              color="warning"
            >
              Register
            </Button>
          </FormWrap>
        </Paper>
      </Box>
      <Box>
        <LoginDescription>
          Already Have Account ? <Link to="/login"> Login Now</Link>
        </LoginDescription>
      </Box>
    </Stack>
  );
};

export default Register;
