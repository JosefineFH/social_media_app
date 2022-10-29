import Heading from "../../components/Common/Heading";
import EditUser from "../../components/SideBar/SideBare";
import GetFromLocalStorage, { userName } from "../../Hooks/CheckifLogedIn";
import GetPosts from "./PostList";

export default function Dashboard() {
  GetFromLocalStorage();

  const items = JSON.parse(localStorage.getItem("user authentication"));

  return (
    <div>
      <div className="dashboard_layout">
        <div className="sidebar_container">
          <EditUser />
        </div>
        <div className="post_container">
          <h1>Welcome {items.name}</h1>
          <GetPosts />
        </div>
      </div>
    </div>
  );
}
