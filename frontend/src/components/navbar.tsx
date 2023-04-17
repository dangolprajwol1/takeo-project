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
import { Link } from "react-router-dom";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { useState } from "react";
const NavBar = () => {
  const pages = ["Home", "Dashboard", "Login", "Register", "Add Task"];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
              {pages.map((page) => (
                <ListItem>
                  <Link to={`/${page.replace(/\s+/g, "").toLowerCase()}`}>
                    {page}{" "}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Navigation>
        </Grid>
        <Grid item md={3} sm={12}>
          <UserWrap>
            <p> Welcome User</p>
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

              <MenuItem>
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
