import { Box, Alert, Button, TextField, Paper, Stack } from "@mui/material";
import { FormWrap } from "../styled-components/taskComponent";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutActions, ResetError, UserLogin } from "../store/slice/userSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Loader from "./subComponents/loader";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const data = useLocation();

  const user = useSelector((state: any) => state.users);
  useEffect(() => {
    dispatch(ResetError());
    if (user.loggedIn) {
      navigate("/");
    }
  }, []);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const credentials: string[] = [username, password];

    const user = await dispatch(UserLogin(credentials));

    if (!user.payload.error) {
      navigate("/");
    }
  };
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
      <Loader />
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
            borderRadius: "1rem",
          }}
        >
          <FormWrap onSubmit={handleLogin}>
            {user.error.length === 0 && data?.state && (
              <Alert severity="error">{data?.state?.alert}</Alert>
            )}
            {user.error.length > 0 &&
              user.error.map((e: any) => {
                return (
                  <Alert variant="filled" severity="error">
                    {e.message}
                  </Alert>
                );
              })}

            <TextField
              id="outlined-basic"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button
              type="submit"
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
