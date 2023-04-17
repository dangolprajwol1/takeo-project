import { Box, Container, Button, TextField, Paper, Stack } from "@mui/material";
import { FormWrap } from "../styled-components/taskComponent";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
const Login = () => {
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
        <LoginTitle>Login To Your Account</LoginTitle>
      </Box>
      <Box>
        <Paper
          sx={{
            minWidth: "23rem",
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormWrap>
            <TextField id="outlined-basic" label="Username" />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
            />
            <Button
              variant="contained"
              size="large"
              sx={{ background: "#E45C32" }}
              color="warning"
            >
              Login
            </Button>
          </FormWrap>
        </Paper>
      </Box>
      <Box>
        <LoginDescription>
          No Account ? <Link to="/register"> Create New Account</Link>
        </LoginDescription>
      </Box>
    </Stack>
  );
};
export const LoginTitle = styled("h2")((props) => ({
  fontWeight: "500",
}));
export const LoginDescription = styled("p")((props) => ({
  fontWeight: "400",
}));
export default Login;
