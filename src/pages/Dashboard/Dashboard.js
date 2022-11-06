import GetPosts from "../../components/posts/DashboradPostList";

export default function Dashboard() {
  const items = JSON.parse(localStorage.getItem("user authentication"));

  return (
    <div>
      <GetPosts />
    </div>
  );
}
