import axios from "axios";
import { slice } from "lodash";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import missingImage from "../../assets/image_missing.png";
import { Link } from "react-router-dom";

export default function UserList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(20);
  const initialUsers = slice(users, 0, index)
  const url = BASE_URL + `/profiles?sort=name&sortOrder=asc&_followers=true&_following=true&limit=20`;
  const token = auth.accessToken;
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(function () {
    async function getUserList() {

      try {
        const response = await axios.get(url, options);
        const users = response.data;
        console.log(users)
        setUsers(users);
      } catch (error) {
        setIsError("There was an error fetching the profile");
      } finally {
        setIsLoading(false);
      }
    }

    getUserList();

  }, []);
  
  function loadMore() {
    let offset = 20;
    async function getUserList() {  
      offset += 10
      try {
        const response = await axios.get(url + `&offset=${offset}`, options);
        const newData = response.data;
        setUsers(users.concat(newData));
      } catch (error) {
        setIsError("There was an error fetching the profile");
      } finally {
        setIsLoading(false);
      }
    }

    getUserList();
  }
  console.log(users)

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <>
      <div>
        <div className="list_post-grid profile_card-list">
          {
            initialUsers.map((user) => {
              let image = missingImage;

              if (user.avatar) {
                image = user.avatar;
              }
              return (
                <div className="profile_card">
                  <Link to={`/profile/${user.name}`} name={user.name}>
                  <img src={image} />
                  <h2>{user.name}</h2>
                  <div className="followers_container">
                    <p>Following: <span>{user.following.length}</span></p> |
                    <p>followers: <span>{user.followers.length}</span></p>
                  </div>
                  </Link>
                </div>

              )
            })
          }
        </div>
      </div>
      <div className="load_button mt-3 mb-5">
        {isCompleted ? (
          <button
            onClick={loadMore}
            type="button"
            className="load_button"
          >
            That's It
          </button>
        ) : (
          <button onClick={loadMore} type="button" className="load_button">
            Load More Users
          </button>
        )}
      </div>
    </>
  )
}