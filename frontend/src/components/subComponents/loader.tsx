import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { userState } from "../../store/slice/userSlice";
const Loader = (props: any) => {
  const userState =
    props.loader === "tasks"
      ? useSelector<any, any>((state) => state.tasks)
      : useSelector<any, any>((state) => state.users);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={userState.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
