import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Common/Loader";
import { BASE_URL } from "../../constants/api";
import missingImage from "../../assets/image_missing.png";
import Comments from "../../components/posts/Comment";
import ReactToPost from "../../components/posts/reaction/ReactToPost"
import FollowUser from "../../components/profile/FollowUser";

export default function PostDetails() {
  const [page, setPage] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    navigate.push("/");
  }
  const url =
    BASE_URL + `/posts/${id}?_author=true&_reactions=true&_comments=true`;
  useEffect(function () {
    async function getPost() {
      const items = JSON.parse(localStorage.getItem("user authentication"));
      const token = items.accessToken;
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get(url, options);
        setPage(response.data);
      } catch (error) {
        // setError(error.toString());
      } finally {
        setLoader(false);
      }
    }

    getPost();
  }, []);

  if (loader) {
    return (
      <div className="page__detail">
        <Loader />
      </div>
    );
  }

  // if (error) {
  //   return <div>Error: An error occurred</div>;
  // }

  let image = missingImage;
  if (page.media) {
    image = page.media;
  }
  return (
    <>
    <div>
      <FollowUser/>
    </div>
      <div>
        <img src={image} />
      </div>
      <div>
        <ReactToPost id={page.id}/>
      </div>
      <h1>{page.title}</h1>

      <div className="info_container">
        <div>
          <p>Created:</p>
          <span>{page.created}</span>
        </div>
        <div>
          <p>Author:</p>{" "}
          <span>
            <Link
              to={`/profile/${[page.author.name]}`}
              key={page.author.name}
              value={page.author.name}
              className="button"
            >
              {page.author.name}
            </Link>
          </span>
        </div>
      </div>
      <div>
        <div>
          <p>{page.body}</p>
        </div>
      </div>
      <div>
        <Comments id={page.id}/>
      </div>
    </>
  );
}
