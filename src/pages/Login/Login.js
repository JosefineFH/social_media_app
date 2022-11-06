import Heading from "../../components/Common/Heading";
import GetFromLocalStorage from "../../Hooks/CheckifLogedIn";
import LoginForm from "../../components/login/LoginForm";

export default function Login() {
  GetFromLocalStorage();
  return (
    <>
      <Heading title="Login" />
      <LoginForm />
    </>
  );
}
