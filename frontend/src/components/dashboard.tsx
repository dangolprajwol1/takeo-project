import { Box, Container, Grid, Button, ButtonGroup } from "@mui/material";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  ButtonWrap,
  ContentWrap,
  DashboardWrap,
  GridTitle,
  Heading,
  Span,
  TodoBox,
  TodoButton,
  TodoPaper,
  TodoPaperRight,
  TodoBoxSpaceEvenly,
  WeatherBoxInner,
  TodoBoxSpaceBetween,
} from "../styled-components/dashboardComponent";
import TaskSidebar from "./subComponents/taskSidebar";
const Dashboard = () => {
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
                    40
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
                    14
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
                <GridTitle> Current Location Info</GridTitle>
                <Paper
                  sx={{
                    // height: "12rem",
                    paddingBottom: "2rem",
                    borderRadius: "0.8rem",
                    // background: "#ACE3E5",
                  }}
                >
                  <TodoBox
                    sx={{
                      fontSize: 15,
                      fontWeight: "300",
                      color: "gray",
                    }}
                  >
                    <Box
                      sx={{
                        "& p": {
                          color: "#4BA064",
                          fontSize: "2rem",
                          fontWeight: "500",
                          letterSpacing: "2px",
                          marginTop: "0.5rem",
                          "& span": {
                            color: "#C1BBB7",
                            fontSize: "0.8rem",
                          },
                        },
                      }}
                    >
                      <p>
                        Monday <span>(22 March, 2023)</span>
                      </p>
                      <TodoBoxSpaceEvenly>
                        <WbSunnyIcon
                          sx={{
                            fontSize: "5rem",
                            color: "#F3C202",
                          }}
                        />
                        <Box
                          sx={{
                            "& > p": {
                              fontSize: "3.5rem",
                              color: "#022519",
                              marginTop: "0.5rem",
                              "& span": {
                                fontSize: "3.5rem",
                                color: "#022519",
                                position: "relative",
                                "&::before": {
                                  content: '" "',
                                  position: "absolute",
                                  width: "1rem",
                                  height: "1rem",
                                  top: "10%",
                                  left: "-30%",
                                  borderRadius: "50%",
                                  border: "3px solid #022519",
                                },
                              },
                            },
                          }}
                        >
                          <p>
                            14 <span>C</span>
                          </p>
                        </Box>
                      </TodoBoxSpaceEvenly>
                      <TodoBoxSpaceBetween sx={{ color: "#1976D2" }}>
                        <WeatherBoxInner>
                          <WaterDropIcon />
                          <span>49%</span>
                        </WeatherBoxInner>
                        <WeatherBoxInner>
                          <AirIcon />
                          <span>12 m/h</span>
                        </WeatherBoxInner>
                        <WeatherBoxInner>
                          <AccessTimeIcon />
                          <span>11:12 pm</span>
                        </WeatherBoxInner>
                      </TodoBoxSpaceBetween>
                    </Box>
                  </TodoBox>
                </Paper>
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
