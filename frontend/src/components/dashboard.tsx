import { Box, Container, Grid, Button, ButtonGroup } from "@mui/material";
import Paper from "@mui/material/Paper";

import TimelapseIcon from "@mui/icons-material/Timelapse";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import isAfter from "date-fns/isAfter";
import {
  ButtonWrap,
  ContentWrap,
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
const Dashboard = () => {
  const currentUserTasks = useSelector<any, any>((state) => state.tasks);
  const completedTask = currentUserTasks.userTasks.filter(
    (item: any) => item.completed === true
  );
  const expiredTask = currentUserTasks.userTasks.filter((item: any) =>
    isAfter(Date.now(), new Date(item.expiry))
  );
  // console.log(expiredTask);
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
              </Grid>{" "}
              <Grid item md={12} xs={12}>
                <LocationComponent />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3.5} sm={6} xs={12}>
            <GridTitle> Ending Today</GridTitle>
            <Box
              sx={{
                display: "flex",
                width: "85%",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <TodoButton
                variant="outlined"
                colors="#C47689"
                startIcon={<StarBorderIcon sx={{ fontSize: 50 }} />}
              >
                Today
              </TodoButton>
              <TodoButton
                variant="outlined"
                colors="#1976d2"
                startIcon={<CalendarMonthIcon sx={{ fontSize: 50 }} />}
              >
                Tomorrow
              </TodoButton>
            </Box>
            <TodoPaperRight
              sx={{
                my: "1rem",
                p: "0.75rem",
                borderRadius: "0.85rem",
                width: "85%",
              }}
            >
              <ContentWrap>
                <Box>
                  <TimelapseIcon sx={{ color: "#FF5E5E" }} />
                </Box>
                <Box>
                  <Heading> Ending task </Heading>
                  <Span> Today 4 pm</Span>
                </Box>
                <Box></Box>
              </ContentWrap>
            </TodoPaperRight>
            <TodoPaperRight
              sx={{
                my: "1rem",
                p: "0.75rem",
                borderRadius: "0.85rem",
                width: "85%",
              }}
            >
              <ContentWrap>
                <Box>
                  <TimelapseIcon sx={{ color: "#FF5E5E" }} />
                </Box>
                <Box>
                  <Heading> Ending task </Heading>
                  <Span> Today 4 pm</Span>
                </Box>
                <Box></Box>
              </ContentWrap>
            </TodoPaperRight>
          </Grid>
        </Grid>
      </Container>
    </DashboardWrap>
  );
};

export default Dashboard;
