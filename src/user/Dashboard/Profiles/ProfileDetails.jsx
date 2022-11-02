import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import missingImage from "../../../assets/image_missing.png"
import GetUserPost from "../../UserProfile/GetUserPost";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export default function GetProfileDetails(props) {
  let navigate = useNavigate();
  const items = JSON.parse(localStorage.getItem('user authentication'));
  const [auth, setAuth] = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const url = BASE_URL + `/profiles/${props.name}?_followers=true&_following=true&_posts=true`;

  useEffect(() => {
    async function getUserDetails() {
      const token = items.accessToken;
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.get(url, options);
        const userDetails = response.data
        setUserData(userDetails)
      } catch (error) {
        console.log(error)
        setIsError("There was an error fetching your profile");
      } finally {
        setIsLoading(false);
      }
    }
    getUserDetails();
  }, [])

  if (isLoading) {
    if (!auth) {
      navigate('/')
    }
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>{isError}</div>;
  }
  return (
    <div>
      <h1>{props.name}</h1>
      <div className="following_container">
        <p>Followers: {userData.followers.length}</p>
        |
        <p>Following: {userData.following.length}</p>
      </div>
      <GetUserPost name={userData.name} />
    </div>
  )
}