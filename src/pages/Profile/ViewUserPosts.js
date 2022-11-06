import { useContext } from "react";
import GetPostsList from "../../components/profile/PostsList";
import AuthContext from "../../context/AuthContext";

export default function ViewUserPosts() {
  const [auth, setAuth] = useContext(AuthContext);

  return <GetPostsList />;
}
