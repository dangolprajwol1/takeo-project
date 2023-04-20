import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {
  Header,
  Logo,
  Navigation,
  UserWrap,
} from "../styled-components/navComponents";

// import ListItem from "@mui/material/ListItem";
import { List, ListItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutActions, LogoutUser } from "../store/slice/userSlice";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const currentUser = useSelector<any, any>((state) => state.users);
  const logout = () => {
    // dispatch(LogoutActions());
    dispatch(LogoutUser());
    navigate("/login");
  };
  const pages = ["Home", "Dashboard", "Login", "Register", "Add Task"];
  if (currentUser.loggedIn) {
    pages.splice(2, 2);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // useEffect(() => {
  //   if (currentUser.loggedIn) {
  //     pages.splice(2, 2);
  //   }
  // }, []);
  return (
    <Header>
      <Grid container spacing={2} sx={{ padding: 1.5 }}>
        <Grid item md={3} sm={12}>
          <Logo>
            <p>Task</p>
            <span>Tracker</span>
          </Logo>
        </Grid>
        <Grid item md={6} sm={12}>
          <Navigation>
            <List>
              {pages.map((page, index) => (
                <ListItem key={`${index}-${page}`}>
                  <Link to={`/${page.replace(/\s+/g, "").toLowerCase()}`}>
                    {page}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Navigation>
        </Grid>
        <Grid item md={3} sm={12}>
          <UserWrap>
            <p> Welcome {currentUser.loggedInUser}</p>
            <Link to="/">
              <Tooltip title="You have new Notification">
                <Badge color="success" badgeContent={99}>
                  <NotificationsActiveIcon />
                </Badge>
              </Tooltip>
            </Link>
            <Tooltip title="Profile">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                {" "}
                <Avatar /> Profile
              </MenuItem>

              <MenuItem onClick={() => logout()}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </UserWrap>
        </Grid>
      </Grid>
    </Header>
  );
};

export default NavBar;
