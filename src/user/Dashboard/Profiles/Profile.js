import Heading from "../../../components/Common/Heading";
import GetFromLocalStorage from "../../../Hooks/CheckifLogedIn";
import GetProfile from "./Profiles";

export default function Profile() {
  GetFromLocalStorage();

  return (
    <div>
      <Heading title="The user Profile" />
      <div>
        <GetProfile />
      </div>
    </div>
  );
}
