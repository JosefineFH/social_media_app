import Heading from "../../components/Common/Heading";
import EditUser from "../../components/SideBar/SideBare";
import GetFromLocalStorage from "../../Hooks/CheckifLogedIn";
import GetPosts from "./Posts/PostList";

export default function Dashboard() {
  // GetFromLocalStorage();

  const items = JSON.parse(localStorage.getItem("user authentication"));

  return (
    <div>
          {/* <h1>Welcome {items.name}</h1> */}
          <GetPosts />
    </div>
  );
}
