import { Box, Container, Grid, Button, ButtonGroup } from "@mui/material";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
} from "../styled-components/dashboardComponent";
const Dashboard = () => {
  return (
    <DashboardWrap>
      <Container>
        <Grid container spacing={10} rowSpacing={2}>
          <Grid item md={3.5} sm={6} xs={12}>
            <GridTitle> OnGoing Task</GridTitle>
            <TodoPaper
              sx={{
                my: "1rem",
                p: "0.75rem",
                borderRadius: "0.85rem",
              }}
            >
              <ContentWrap color="#1976d2">
                <Box ml={2}>
                  <Heading> General</Heading>
                  <Span> 8 tasks</Span>
                </Box>
                <Box sx={{ opacity: "0" }}>
                  <ModeEditIcon sx={{ fontSize: 30, color: "gray" }} />
                </Box>
              </ContentWrap>
            </TodoPaper>
            <TodoPaper
              sx={{
                my: "1rem",
                p: "0.75rem",
                borderRadius: "0.85rem",
              }}
            >
              <ContentWrap color="#E45C32">
                <Box ml={2}>
                  <Heading> General</Heading>
                  <Span> 8 tasks</Span>
                </Box>
                <Box sx={{ opacity: "0" }}>
                  <ModeEditIcon sx={{ fontSize: 30, color: "gray" }} />
                </Box>
              </ContentWrap>
            </TodoPaper>
            <TodoPaper
              sx={{
                my: "1rem",
                p: "0.75rem",
                borderRadius: "0.85rem",
              }}
            >
              <ContentWrap color="#1FBEC1">
                <Box ml={2}>
                  <Heading> General</Heading>
                  <Span> 8 tasks</Span>
                </Box>
                <Box sx={{ opacity: "0" }}>
                  <ModeEditIcon sx={{ fontSize: 30, color: "gray" }} />
                </Box>
              </ContentWrap>
            </TodoPaper>
            <ButtonWrap>
              <Button
                variant="contained"
                startIcon={<AddIcon sx={{ fontSize: 50 }} />}
                sx={{
                  width: 4 / 4,
                  height: "3rem",

                  borderRadius: "0.5rem",
                }}
              >
                Add New Task
              </Button>
            </ButtonWrap>
          </Grid>
          <Grid item md={5} sm={6} xs={12}>
            <GridTitle> Progress So Far</GridTitle>
            <Grid container spacing={2} rowSpacing={1}>
              <Grid item md={6} xs={12}>
                <Paper
                  elevation={3}
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
                      color: "#38761D",
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
                  elevation={3}
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
                      color: "#C80000",
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
            </Grid>
          </Grid>
          <Grid item md={3.5} sm={6} xs={12}>
            <GridTitle> Ending Today</GridTitle>
            <Box
              sx={{
                display: "flex",
                width: "85%",
                justifyContent: "space-between",
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
                  <TimelapseIcon sx={{ color: "#C80000" }} />
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
                  <TimelapseIcon sx={{ color: "#C80000" }} />
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
