import { useContext } from "react";
import { Nav } from "react-bootstrap"
import AuthContext from "../../context/AuthContext";

export default function Logout(){
  const [auth, setAuth] = useContext(AuthContext);
  function logoutUser(){
    console.log("logout")
    setAuth(null);
  }

  return (
    <Nav.Link onClick={logoutUser}>logout</Nav.Link> 
  )
}