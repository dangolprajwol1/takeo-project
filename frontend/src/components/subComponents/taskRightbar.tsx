import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Grid,
  List,
  ListItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridTitle } from "../../styled-components/dashboardComponent";
import { useSelector } from "react-redux";
const RightBar = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const userTask = useSelector<any, any>((state) => state.tasks);
  return (
    <Grid item md={3.5} sm={6} xs={12}>
      <GridTitle> Available Tasks</GridTitle>
      {userTask.userTasks.length === 0 && (
        <p> No Tasks To Display. Add a Task Title First</p>
      )}
      <Paper>
        {userTask.userTasks.length > 0 &&
          userTask.userTasks.map((task: any) => {
            return (
              <Accordion
                expanded={expanded === task._id}
                onChange={handleChange(task._id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Box>{task.title}</Box>
                </AccordionSummary>

                <AccordionDetails>
                  {task.todos.length === 0 && <p> No Tasks To Display</p>}
                  {task.todos.length > 0 && (
                    <List>
                      {task.todos.map((todo: any) => {
                        return (
                          <ListItem>
                            <ListItemText id="" primary={todo.description} />
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <Checkbox edge="end" />
                              <ModeEditIcon sx={{ color: "gray" }} />
                              <DeleteIcon
                                sx={{ fontSize: 30, color: "gray" }}
                              />
                            </Box>
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
      </Paper>
    </Grid>
  );
};

export default RightBar;
