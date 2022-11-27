import { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Heading from "../../components/Common/Heading";
import CreatePostForm from "../../components/posts/CreatePost";
import AuthContext from "../../context/AuthContext";

export default function CreatePost() {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);

  if (auth === null) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Heading title="Create Post" />
      <CreatePostForm />
    </>
  );
}
