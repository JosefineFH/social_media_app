import { Container, Nav, Navbar } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from "../../user/Login/Login"
import { AuthProvider } from "../../context/AuthContext";
import Dashboard from "../../user/Dashboard/Dashboard";
import RegisterUser from "../../user/Register/RegisterUser";
import PostDetails from "../../user/Dashboard/Post/PostDetails";
import Profile from "../../user/Dashboard/Profiles/Profile";

export default function NavigationLayout() {
  const items = JSON.parse(localStorage.getItem('user authentication'));
  
  return (
    <AuthProvider>
      <Router>
        <Navbar expand="lg">
          <Navbar.Brand href="/">Social Media App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/register" exact element={<RegisterUser />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/profile/:name" element={<Profile />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  )
}