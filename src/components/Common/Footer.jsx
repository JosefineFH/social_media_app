import { useContext } from "react";
import { Nav } from "react-bootstrap"
import AuthContext from "../../context/AuthContext";


export default function Footer() {
  const [auth, setAuth] = useContext(AuthContext);


  return (
    <footer>
      <div className="footer_menu">
        <Nav>
          {auth ? (
            <>
              <div>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/userprofiles">Users</Nav.Link>
              </div>
              <div>
                <Nav.Link href="/user">{auth.name}</Nav.Link>
                <Nav.Link href="/user">Profile</Nav.Link>
              <Nav.Link href="/viewPosts">View your posts</Nav.Link>
              </div>
            </>
          )
            : (
              <Nav.Link href="/">Login</Nav.Link>
            )
          }
        </Nav>
      </div>
      <div className="footer_info">
        <a href="/" className="navbar-brand">Social Media App</a>
        <h6>Made by Josefine Holth</h6>
      </div>
    </footer>
  )
}