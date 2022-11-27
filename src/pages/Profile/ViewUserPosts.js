import { useContext} from "react";
import { Navigate } from "react-router-dom";
import GetPostsList from "../../components/profile/PostsList";
import AuthContext from "../../context/AuthContext";

export default function ViewUserPosts() {
  const [auth, setAuth] = useContext(AuthContext);

  if (auth === null) {
    return <Navigate replace to="/" />;
  }

  return <GetPostsList />;
}
