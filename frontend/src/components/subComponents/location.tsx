import { Box, Paper } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  TodoBox,
  TodoBoxSpaceEvenly,
  WeatherBoxInner,
  TodoBoxSpaceBetween,
} from "../../styled-components/dashboardComponent";
import { format } from "date-fns";
// import { getCurrentLocation } from "../../services/locationService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLocation, UserWeatherInfo } from "../../store/slice/userSlice";
import Loader from "./loader";
const LocationComponent = () => {
  const dispatch = useDispatch<any>();
  const currentUser = useSelector<any, any>((state) => state.users);
  //   console.log(format(new Date(), "PPPP"));
  const date = new Date();
  const [clock, setClock] = useState<Date>(date);

  const getCurrentLocation = async () => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // if (currentUser.location.length === 0) {
        //   dispatch(
        //     SetLocation([position.coords.longitude, position.coords.latitude])
        //   );
        // }
        await dispatch(
          UserWeatherInfo([position.coords.longitude, position.coords.latitude])
        );
      },
      () => {
        // error or denied location state
        return;
      },
      options
    );
  };
  useEffect(() => {
    const time = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => {
      clearInterval(time);
    };
  }, []);
  useEffect(() => {
    if (currentUser.weather && Object.keys(currentUser.weather).length > 0) {
      return;
    }
    getCurrentLocation();
  }, []);

  return (
    <>
      {/* <GridTitle> Current Location Infos</GridTitle> */}
      <Loader />
      <Paper
        sx={{
          // height: "12rem",
          paddingBottom: "1rem",

          borderRadius: "0.8rem",
          // background: "#ACE3E5",
        }}
      >
        <TodoBox
          sx={{
            fontSize: 15,
            fontWeight: "300",
            color: "gray",
            width: "100%",
            "& p": {
              color: "#4BA064",
              fontSize: "2rem",
              fontWeight: "500",
              letterSpacing: "1px",
              marginTop: "0.5rem",
              "& span": {
                color: "#C1BBB7",
                fontSize: "0.8rem",
              },
            },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              "& p": {
                "& span": {
                  display: "block",
                },
              },
            }}
          >
            <p>
              {format(date, "EEEE")}{" "}
              <span>({format(date, "MMMM do, yyyy")})</span>
            </p>
          </Box>
          {currentUser.weather &&
            Object.keys(currentUser.weather).length > 0 && (
              <>
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
                          marginLeft: "0.5rem",
                          "&::before": {
                            content: '" "',
                            position: "absolute",
                            width: "1rem",
                            height: "1rem",
                            top: "15%",
                            left: "-20%",
                            borderRadius: "50%",
                            border: "3px solid #022519",
                          },
                        },
                      },
                    }}
                  >
                    <p>
                      {Math.trunc(currentUser.weather.main.temp)}
                      <span>C</span>
                    </p>
                  </Box>
                </TodoBoxSpaceEvenly>

                <TodoBoxSpaceBetween sx={{ color: "#1976D2", gap: "0.5rem " }}>
                  <WeatherBoxInner>
                    <WaterDropIcon />
                    <span>
                      {Math.trunc(currentUser.weather.main.humidity)}%
                    </span>
                  </WeatherBoxInner>
                  <WeatherBoxInner>
                    <AirIcon />
                    <span>
                      {Math.trunc(currentUser.weather.wind.speed)} m/s
                    </span>
                  </WeatherBoxInner>
                  <WeatherBoxInner sx={{ flex: "1" }}>
                    <AccessTimeIcon />
                    {/* <span>{format(date, "HH:mm:ss a")}</span> */}
                    <span>{format(clock, "HH:mm:ss a")}</span>
                  </WeatherBoxInner>
                </TodoBoxSpaceBetween>
              </>
            )}
          {currentUser.weather &&
            Object.keys(currentUser.weather).length === 0 && (
              <TodoBox> Please Allow to access location. </TodoBox>
            )}
        </TodoBox>
      </Paper>
    </>
  );
};

export default LocationComponent;
