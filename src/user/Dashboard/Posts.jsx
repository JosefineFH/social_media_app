import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import missingImage from "../../assets/image_missing.png"

export default function GetPosts() {

  const [posts, setPosts] = useState([]);
  const [photoURL, setPhotoURL] = useState(null);
  const url = BASE_URL + "/posts";

  useEffect(function () {
    async function getPosts() {
      const items = JSON.parse(localStorage.getItem('user authentication'));
      const token = items.accessToken;
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.get(url, options);
        const posts = response.data;
        setPosts(posts);
        // setPhotoURL(posts.media)
      } catch (error) {
        console.log(error)
        // setError(error.toString());
      } finally {
        // setLoader(false);
      }
    }

    getPosts();
  }, []);

  // if (error) {
  //   console.log(error);
  //   return <div>Error: An error occurred</div>;
  // }

  return (
    <CardGroup>
      {posts.map((posts) => {
        let image = posts.media
        if (!posts.media) {
          return (
            <Link >
              <Card>
              <div className="image_container">
                <Card.Img variant="top" src={missingImage} />
                </div>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: `<p></p>`,
                    }}
                  ></Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted"></small>
                </Card.Footer>
              </Card>
            </Link>
          );
        } else {
          image = posts.media
          console.log(image)
          return (
            <Link >
              <Card>
              <div className="image_container">
                <Card.Img variant="top" src={image} />
                </div>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: `<p></p>`,
                    }}
                  ></Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted"></small>
                </Card.Footer>
              </Card>
            </Link>
          );
        }
      })}
    </CardGroup>
  )
}