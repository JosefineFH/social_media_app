import { useParams } from "react-router-dom";
import FollowerList from "../../components/profile/Followers";

export default function Followers(){
  const { name } = useParams();
  return <FollowerList name={name}/>
}