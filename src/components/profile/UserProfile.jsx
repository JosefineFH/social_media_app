import { useContext } from "react";
import EditUser from "../SideBar/SideBare";
import AuthContext from "../../context/AuthContext";
import GetProfileDetails from "./ProfileDetails";
import missingBanner from "../../assets/banner_missing.png"

export default function UserProfile() {
  const [auth, setAuth] = useContext(AuthContext);
  console.log(auth.banner.length)
  let banner;
  if(auth.banner.length === 0){
    banner = banner = missingBanner;
  }else{
    banner = auth.banner
  }

  return (
    <>
      {
        auth ? (
          <>
            <div className="banner_container" style={{ backgroundImage: `url(${banner})` }}>
            </div>
            <div className="container profile_container">
              <div className="sidebar_container">
                <EditUser />
              </div>
              <div className="content_container">
                <GetProfileDetails name={auth.name} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="content_container">
              <GetProfileDetails name={auth.name} />
            </div>
          </>
        )
      }
    </>
  )
}