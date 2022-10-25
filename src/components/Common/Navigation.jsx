import { Container, Nav, Navbar } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from "../../Views/Home";
import Login from "../../user/Login/Login"
import { AuthProvider } from "../../context/AuthContext";
import Dashboard from "../../user/Dashboard/Dashboard";
import RegisterUser from "../../user/Register/RegisterUser";

export default function NavigationLayout() {
  return (
    <AuthProvider>
      <Router>
        <Navbar expand="lg">
          <Navbar.Brand href="/">Social Media App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/register" exact element={<RegisterUser />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  )
}