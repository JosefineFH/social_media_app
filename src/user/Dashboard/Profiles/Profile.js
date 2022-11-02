import Heading from "../../../components/Common/Heading";
import { useNavigate } from "react-router-dom";
import GetProfileDetails from "./ProfileDetails"


export default function Profile() {
  let history = useNavigate();
  const items = JSON.parse(localStorage.getItem('user authentication'));
  if(items === null){
    history("/");
  }

  return (
    <div>
      <Heading title="The user Profile" />
      <div>
       <GetProfileDetails/>
      </div>
    </div>
  );
}
