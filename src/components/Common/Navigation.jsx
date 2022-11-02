import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Login from "../../user/Login/Login"
import AuthContext, { AuthProvider } from "../../context/AuthContext";
import Dashboard from "../../user/Dashboard/Dashboard";
import RegisterUser from "../../user/Register/RegisterUser";
import PostDetails from "../../user/Dashboard/Post/PostDetails";
import Profile from "../../user/Dashboard/Profiles/Profile";
import UserProfile from "../../user/UserProfile/UserProfile";
import CreatePost from "../../user/UserProfile/CreatePosts";
import { useContext } from "react";

export default function NavigationLayout() {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
        <Router>
          <Navbar expand="lg">
            <Navbar.Brand href="/">Social Media App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {auth ? (
                  <>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link >{auth.name}</Nav.Link>
                    <NavDropdown id="basic-nav-dropdown">
                      <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        View your posts
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/createposts">Create new post</NavDropdown.Item>
                      <NavDropdown.Item href="/createposts">Logout</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link to="/dashboard">logout</Nav.Link> 
                  </>
                ) : (
                  <Nav.Link to="/">Login</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Container fluid>
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route path="/register" exact element={<RegisterUser />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/createposts" element={<CreatePost />} />

            </Routes>
          </Container>
        </Router>
    </>
  )
}