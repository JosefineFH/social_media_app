import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import missingImage from "../../../assets/image_missing.png"
import GetUserPost from "../../UserProfile/GetUserPost";

export default function GetProfileDetails(props) {
  let navigate = useNavigate();
  let username

  if (props != null) {
    username = props.name
  } else {
    const items = JSON.parse(localStorage.getItem('user authentication'));
    username = items.name
  }
  console.log(username)

  const [userData, setUserData] = useState();
  const message = document.querySelector(".message");
  const url = BASE_URL + `/profiles/${username}?_followers=true&_following=true&_posts=true`;
  console.log(url)

  useEffect(function () {
    async function getUserDetails() {
      const items = JSON.parse(localStorage.getItem('user authentication'));
      const token = items.accessToken;
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.get(url, options);
        const userDetails = response.data
        console.log(userDetails)
        setUserData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserDetails();
  }, [])

  return (
    <div>
      <h1>{username}</h1>
      <div className="following_container">
        <p>Followers: {userData.followers.length}</p>
        |
        <p>Following: {userData.following.length}</p>
      </div>
      <GetUserPost name={userData.name} />
    </div>
  )
}