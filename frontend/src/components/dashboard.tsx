import { Box, Container, Grid, Button, ButtonGroup } from "@mui/material";
import Paper from "@mui/material/Paper";

import TimelapseIcon from "@mui/icons-material/Timelapse";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import isAfter from "date-fns/isAfter";
import {
  ButtonWrap,
  ContentWrap,
  ContentWrapRight,
  DashboardWrap,
  GridTitle,
  Heading,
  Span,
  TodoBox,
  TodoButton,
  TodoPaperRight,
} from "../styled-components/dashboardComponent";
import TaskSidebar from "./subComponents/taskSidebar";
import LocationComponent from "./subComponents/location";
import { useSelector } from "react-redux";
import TaskEndingToday from "./subComponents/dashboardRightbar";
const Dashboard = () => {
  const currentUserTasks = useSelector<any, any>((state) => state.tasks);
  const completedTask = currentUserTasks.userTasks.filter(
    (item: any) => item.completed === true
  );
  const incompleteTask = currentUserTasks.userTasks.filter(
    (item: any) => item.completed === false
  );
  const expiredTask = currentUserTasks.userTasks.filter(
    (item: any) => isAfter(Date.now(), new Date(item.expiry)) && !item.completed
  );

  return (
    <DashboardWrap>
      <Container>
        <Grid container spacing={10} rowSpacing={2}>
          <TaskSidebar title="Ongoing Task" />
          <Grid item md={5} sm={6} xs={12}>
            <GridTitle> Progress So Far</GridTitle>
            <Grid container spacing={2} rowSpacing={1}>
              <Grid item md={6} xs={12}>
                <Paper
                  sx={{
                    p: "1rem",
                    height: "12rem",
                    borderRadius: "0.8rem",
                  }}
                >
                  <TodoBox
                    sx={{
                      fontSize: 80,
                      fontWeight: "300",
                      color: "#1976d2",
                    }}
                  >
                    {currentUserTasks.userTasks.length}
                  </TodoBox>
                  <TodoBox
                    sx={{
                      fontSize: 15,
                      fontWeight: "300",
                      color: "gray",
                    }}
                  >
                    Total Created Tasks
                  </TodoBox>
                </Paper>
              </Grid>
              <Grid item md={6} xs={12}>
                <Paper
                  sx={{
                    p: "1rem",
                    height: "12rem",
                    borderRadius: "0.8rem",
                  }}
                >
                  <TodoBox
                    sx={{
                      fontSize: 80,
                      fontWeight: "300",
                      color: "#4BA064",
                    }}
                  >
                    {completedTask.length}
                  </TodoBox>
                  <TodoBox
                    sx={{
                      fontSize: 15,
                      fontWeight: "300",
                      color: "gray",
                    }}
                  >
                    Tasks Completed
                  </TodoBox>
                </Paper>
              </Grid>
              <Grid item md={6} xs={12}>
                <Paper
                  sx={{
                    mb: "1rem",
                    p: "1rem",
                    height: "12rem",
                    borderRadius: "0.8rem",
                  }}
                >
                  <TodoBox
                    sx={{
                      fontSize: 80,
                      fontWeight: "300",
                      color: "#E45C32",
                    }}
                  >
                    {incompleteTask.length}
                  </TodoBox>
                  <TodoBox
                    sx={{
                      fontSize: 15,
                      fontWeight: "300",
                      color: "gray",
                    }}
                  >
                    Tasks Need Action
                  </TodoBox>
                </Paper>
              </Grid>

              <Grid item md={6} xs={12}>
                <Paper
                  sx={{
                    mb: "1rem",
                    p: "1rem",
                    height: "12rem",
                    borderRadius: "0.8rem",
                  }}
                >
                  <TodoBox
                    sx={{
                      fontSize: 80,
                      fontWeight: "300",
                      color: "#FF5E5E",
                    }}
                  >
                    {expiredTask.length}
                  </TodoBox>
                  <TodoBox
                    sx={{
                      fontSize: 15,
                      fontWeight: "300",
                      color: "gray",
                    }}
                  >
                    Tasks Expired
                  </TodoBox>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3.5} sm={6} xs={12}>
            <GridTitle> Weather Today</GridTitle>
            <LocationComponent />
            <GridTitle>Upcoming Task</GridTitle>
            <TaskEndingToday />
          </Grid>
        </Grid>
      </Container>
    </DashboardWrap>
  );
};

export default Dashboard;
