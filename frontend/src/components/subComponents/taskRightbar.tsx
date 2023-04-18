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
const RightBar = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Grid item md={3.5} sm={6} xs={12}>
      <GridTitle> Available Tasks</GridTitle>
      <Paper>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Box>Personal data</Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText id="" primary={`Line item`} />
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
                  <DeleteIcon sx={{ fontSize: 30, color: "gray" }} />
                </Box>
              </ListItem>
              <ListItem>
                <ListItemText id="" primary={`Line item`} />
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
                  <DeleteIcon sx={{ fontSize: 30, color: "gray" }} />
                </Box>
              </ListItem>
              <ListItem>
                <ListItemText id="" primary={`Line item`} />
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
                    onClick={() => alert("ok")}
                    sx={{ fontSize: 30, color: "gray" }}
                  />
                </Box>
              </ListItem>
              <ListItem secondaryAction={<Checkbox edge="end" />}>
                <ListItemText id="" primary={`Line item`} />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            Personal Data
          </AccordionSummary>
          <AccordionDetails>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Grid>
  );
};

export default RightBar;
