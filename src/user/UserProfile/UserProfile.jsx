import { useContext } from "react";
import EditUser from "../../components/SideBar/SideBare";
import AuthContext from "../../context/AuthContext";
import GetProfileDetails from "../Dashboard/Profiles/ProfileDetails";
import GetUserPost from "./GetUserPost";

export default function UserProfile() {
  const items = JSON.parse(localStorage.getItem('user authentication'));
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <div className="banner_container" style={{ backgroundImage: `url(${auth.banner})` }}>
      </div>
      <div className="container profile_container">
        <div className="sidebar_container">
          <EditUser />
        </div>
        <div className="content_container">
          <GetProfileDetails name={auth.name}/>
        </div>
      </div>
    </>
  )
}