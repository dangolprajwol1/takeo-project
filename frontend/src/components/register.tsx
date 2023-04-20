import {
  Box,
  Container,
  Button,
  TextField,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import { FormWrap } from "../styled-components/taskComponent";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoginDescription, LoginTitle } from "./login";
import { useDispatch, useSelector } from "react-redux";
import { ResetError, UserRegister } from "../store/slice/userSlice";
import { UserData } from "../services/userType";
import Loader from "./subComponents/loader";
const Register = () => {
  const dispatch = useDispatch<any>();
  const user = useSelector((state: any) => state.users);
  const navigate = useNavigate();
  const userData: UserData = {
    username: "",
    password: "",
    email: "",
    phone: "",
    confirmpw: "",
  };
  const [userdata, setUserdata] = useState(userData);

  useEffect(() => {
    dispatch(ResetError());
    if (user.loggedIn) {
      navigate("/");
    }
  }, []);
  const doRegister = async (e: any) => {
    e.preventDefault();
    dispatch(ResetError());
    const data = await dispatch(UserRegister(userdata));

    if (!data.payload.error) {
      setUserdata(userData);
    }
  };
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
      spacing={2}
    >
      <Loader />
      <Box>
        <LoginTitle>Register New Account</LoginTitle>
      </Box>
      <Box>
        <Paper
          sx={{
            minWidth: "25rem",
            padding: "2rem",
            borderRadius: "1rem",
          }}
        >
          <FormWrap onSubmit={doRegister}>
            {user.error.length > 0 &&
              user.error.map((e: any, index: number) => {
                return (
                  <Alert variant="filled" severity="error" key={index}>
                    {e.message}
                  </Alert>
                );
              })}
            {user.success && (
              <Alert variant="filled" severity="success">
                {user.success}
              </Alert>
            )}
            <TextField
              id="outlined-basic"
              label="Username"
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, username: e.target.value }))
              }
              value={userdata.username}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, email: e.target.value }))
              }
              value={userdata.email}
            />
            <TextField
              id="outlined-basic"
              label="Phone Number"
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, phone: e.target.value }))
              }
              value={userdata.phone}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, password: e.target.value }))
              }
              value={userdata.password}
            />
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              type="password"
              variant="outlined"
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, confirmpw: e.target.value }))
              }
              value={userdata.confirmpw}
            />
            <Button
              type="submit"
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
