import { Box, Tooltip } from "@mui/material";

import TimelapseIcon from "@mui/icons-material/Timelapse";

import {
  ContentWrapRight,
  Heading,
  Span,
  TodoButton,
  TodoPaperRight,
} from "../../styled-components/dashboardComponent";

import { useSelector } from "react-redux";
import { addDays, format, isAfter, isSameDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";
const TaskEndingToday = () => {
  const [date, setDate] = useState<Date[]>([]);
  const [endingToday, setEndingToday] = useState([]);
  const currentUserTasks = useSelector<any, any>((state) => state.tasks);

  const settingDate = useMemo(() => {
    let dates: Date[] = [];

    for (let i = 0; i <= 7; i++) {
      dates.push(addDays(new Date(), i));
    }
    setDate(dates);
  }, []);
  const filterTask = (date: Date) => {
    const endingToday = currentUserTasks.userTasks.filter(
      (item: any) => isSameDay(date, new Date(item.expiry)) && !item.completed
    );
    setEndingToday(endingToday);
  };

  useEffect(() => {
    filterTask(new Date());
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.4rem",
          "& button": {
            padding: "0.25rem",
          },
        }}
      >
        {date &&
          date.length > 0 &&
          date.map((date, index) => {
            return (
              <Tooltip title={format(date, "EEEE MMMM do yyyy")} key={index}>
                <TodoButton
                  variant="outlined"
                  colors={index === 0 ? "#C47689" : "#1976d2"}
                  onClick={() => filterTask(date)}
                >
                  {index === 0 ? "Today" : format(date, "MM/dd")}
                </TodoButton>
              </Tooltip>
            );
          })}
      </Box>
      {endingToday.length === 0 && (
        <ContentWrapRight>No Tasks Available. </ContentWrapRight>
      )}
      {endingToday.length > 0 &&
        endingToday.map((task: any) => {
          return !isAfter(Date.now(), new Date(task.expiry)) ? (
            <TodoPaperRight
              sx={{
                my: "1rem",

                borderRadius: "0.85rem",
              }}
              key={task._id}
            >
              <ContentWrapRight>
                <Box>
                  <TimelapseIcon sx={{ color: "#FF5E5E" }} />
                </Box>
                <Box>
                  <Heading> {task.title} </Heading>
                  <Span>
                    {isSameDay(Date.now(), new Date(task.expiry))
                      ? "Today "
                      : format(new Date(task.expiry), "EEEE ")}
                    {format(new Date(task.expiry), "h:mm a")}
                  </Span>
                </Box>
              </ContentWrapRight>
            </TodoPaperRight>
          ) : (
            " "
          );
        })}
    </>
  );
};

export default TaskEndingToday;
