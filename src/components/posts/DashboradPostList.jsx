import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import missingImage from "../../assets/image_missing.png";
import { slice } from "lodash";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function GetPosts() {
  const [auth, setAuth] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(6);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const initialPosts = slice(posts, 0, index)
  const url = BASE_URL + "/posts?_author=true";
  const navigate = useNavigate();

  useEffect(function () {
    async function getPosts() {
      if (auth === null) {
        navigate('/')
      } else {
        const token = auth.accessToken;
        const options = {
          headers: { Authorization: `Bearer ${token}` },
        };
        try {
          const response = await axios.get(url, options);
          const posts = response.data;
          console.log(posts)
          setPosts(posts);
          // setPhotoURL(posts.media)
        } catch (error) {
          console.log(error)
          setIsError("There was an error fetching the profile");
        } finally {
          setIsLoading(false);
        }
      }
    }

    getPosts();
  }, []);
  const loadMore = () => {
    setIndex(index + 6)
    if (index >= posts.length) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }


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
    <>
      <div className="list_post-grid">
        {initialPosts.map((post) => {
          let image = missingImage;

          if (post.media) {
            image = post.media;
          }

          return (
            <Col>
              <Card>
                <div className="image_container">
                  <Link to={`/profile/${post.author.name}`} name={post.author.name} avatar={post.author.avatar} className="author_name">{post.author.name}</Link>
                  <Card.Img variant="top" src={image} />
                </div>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: `<p></p>`,
                    }}
                  ></Card.Text>
                  <Link to={`/post/${[post.id]}`} key={post.id} value={post.id} className="button">Read More</Link>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{post.created}</small>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
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
            Load More +
          </button>
        )}
      </div>
    </>

  )
}