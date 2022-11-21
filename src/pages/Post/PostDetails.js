import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from "../../components/Common/Loader";
import { BASE_URL } from "../../constants/api";
import missingImage from "../../assets/image_missing.png";
import Comments from "../../components/posts/Comment";
import GetPostReaction from "../../components/posts/reaction/GetReaction";
import Moment from "moment";

export default function PostDetails() {
  const [page, setPage] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  let navigate = useNavigate();
  if (!id) {
    navigate.push("/");
  }
  useEffect(function () {
    async function getPost() {
      const url =
        BASE_URL + `/posts/${id}?_author=true&_comments=true&_reactions=true`;
      const items = JSON.parse(localStorage.getItem("user authentication"));
      const token = items.accessToken;
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get(url, options);
        setPage(response.data);
      } catch (error) {
        setError(error.toString());
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

  if (error) {
    return <div>Error: An error occurred</div>;
  }

  let postImage = missingImage;
  if (page.media) {
    postImage = page.media;
  }
  const created = page.created
  const formatDate = Moment(created).format('DD-MM-YYYY')

  return (
    <>
      <div className="image_container">
        <img src={postImage} alt={page.title} />
      </div>
      <div className="reaction_container">
        <GetPostReaction id={page.id} key={page.id} />
      </div>
      <h1>{page.title}</h1>

      <div className="info_container">
        <div>
          <p>Created: </p>
          
          <span>{formatDate}</span>
        </div>
        <div>
          <p>Author: </p>
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
        <div className="page_body-container">
          <p>{page.body}</p>
        </div>
      </div>
      <div>
        <Comments id={page.id} key={page.id} />
      </div>
    </>
  );
}
