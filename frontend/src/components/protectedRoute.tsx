import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedPage = ({ children }: { children: any }) => {
  const currentUser = useSelector<any, any>((state) => state.users);
  if (!currentUser.loggedIn) {
    return (
      <Navigate to="/login" state={{ alert: "You need To Login First" }} />
    );
  }
  return children;
};

export default ProtectedPage;
