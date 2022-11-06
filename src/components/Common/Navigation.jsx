import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from "../../pages/Login/Login"
import AuthContext, { AuthProvider } from "../../context/AuthContext";
import Dashboard from "../../pages/Dashboard/Dashboard";
import RegisterUser from "../../pages/Register/RegisterUser";
import PostDetails from "../../pages/Post/PostDetails";
import Profile from "../../pages/Profile/Profile";
import UserProfile from "../profile/UserProfile";
import { useContext } from "react";
import CreatePost from "../../pages/Post/CreatesPost";
// import CreatePost from "../profile/CreatePosts";

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
            <Route path="/profile/:name" element={<Profile />} />

            </Routes>
          </Container>
        </Router>
    </>
  )
}