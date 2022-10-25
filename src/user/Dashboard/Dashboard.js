import Heading from "../../components/Common/Heading";
import GetFromLocalStorage, { userName } from "../Login/CheckifLogedIn";
import GetPosts from "./Posts";

export default function Dashboard() {
  GetFromLocalStorage();

  return (
    <>
      <h1>Welcome {userName}</h1>
      <div>
        <GetPosts />
      </div>
    </>
  );
}
