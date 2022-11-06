import GetPosts from "../../components/posts/PostList";

export default function Dashboard() {
  const items = JSON.parse(localStorage.getItem("user authentication"));

  return (
    <div>
      <GetPosts />
    </div>
  );
}
