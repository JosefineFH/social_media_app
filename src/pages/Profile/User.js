import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import missingBanner from "../../assets/banner_missing.png";
import EditUser from "../../components/SideBar/SideBare";
import GetProfileDetails from "../../components/profile/ProfileDetails";
import { Navigate } from "react-router";

export default function UserProfile() {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);

  if (auth === null) {
    return <Navigate replace to="/" />;
  }

  let banner;
  if (auth.banner.length === 0) {
    banner = banner = missingBanner;
  } else {
    banner = auth.banner;
  }
  return (
    <>
      <div
        className="banner_container"
        
        style={{ backgroundImage: `url(${banner})` }}
      ></div>
      <div className="container profile_container">
        <div className="sidebar_container">
          <EditUser />
        </div>
        <div className="content_container">
          <GetProfileDetails name={auth.name} />
        </div>
      </div>
    </>
  );
}
