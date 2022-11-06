import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../constants/api";
import { Link } from "react-router-dom";

export default function GetPostsList(){
  // const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const userName = auth.name
  const url = BASE_URL + `/profiles/${userName}/posts`;
  console.log(url)
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  useEffect(function () {
    async function getPosts() {
      if (auth === null) {
        // navigate('/')
      } else {
        const token = auth.accessToken;
        const options = {
          headers: { Authorization: `Bearer ${token}` },
        };
        console.log(options)
        try {
          const response = await axios.get(url, options);
          const posts = response.data;
          setPosts(posts);
        } catch (error) {
          setIsError("There was an error fetching your posts");
        } finally {
          setIsLoading(false);
        }
      }
    }

    getPosts();
  }, []);


  return(
    <>
      {posts.map((post) => {
        return(
          <div>
            <h2>${post.title}</h2>
            <Link>Delete</Link>
            <Link to={`/editPost/${post.id}`}>Edit</Link>
          </div>
        )
      })}
    </>
  )
}