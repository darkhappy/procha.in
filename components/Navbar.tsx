import { Container, Navbar, NavbarBrand, Nav, NavLink } from "react-bootstrap";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function NavbarComponent({}) {
  const { user, username } = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg" className="mb-5">
      <Container>
        <Link href="/" passHref>
          <NavbarBrand>procha.in</NavbarBrand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <NavLink>Home</NavLink>
            </Link>
            {username && (
              <>
                <Link href="/admin" passHref>
                  <NavLink>Admin</NavLink>
                </Link>
                <Link href="/profile" passHref>
                  <NavLink>Profile</NavLink>
                </Link>
              </>
            )}
            {!username && (
              <>
                <Link href="/login" passHref>
                  <NavLink>Log in</NavLink>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
