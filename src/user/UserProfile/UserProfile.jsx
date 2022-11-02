import EditUser from "../../components/SideBar/SideBare";
import GetProfileDetails from "../Dashboard/Profiles/ProfileDetails";
import GetUserPost from "./GetUserPost";


export default function UserProfile() {
  const items = JSON.parse(localStorage.getItem('user authentication'));


  return (
    <>
      <div className="banner_container" style={{ backgroundImage: `url(${items.banner})` }}>
      </div>
      <div className="container profile_container">
        <div className="sidebar_container">
          <EditUser />
        </div>
        <div className="content_container">
          <GetProfileDetails name={items.name}/>
          {/* <h1>{items.name}'s profile</h1>
          <GetUserPost name={items.name}/> */}
        </div>
      </div>
    </>
  )
}