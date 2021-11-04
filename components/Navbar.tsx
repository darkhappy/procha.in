import { Container, Navbar, NavbarBrand, Nav, NavLink } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function NavbarComponent({}) {
	const { user, da } = useContext(UserContext);

	return (
		<Navbar bg="light" expand="lg" className="mb-5">
			<Container>
				<Link href="/" passHref>
					<NavbarBrand>procha.in</NavbarBrand>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav className="me-auto">
						<Link href="/" passHref>
							<NavLink>Home</NavLink>
						</Link>
						{user && da && (
							<>
								<Link href="/admin" passHref>
									<NavLink>Admin</NavLink>
								</Link>
								<Link href="/profile" passHref>
									<NavLink>Profile</NavLink>
								</Link>
							</>
						)}
					</Nav>
					{user && da ? (
						<Link href="/profile" passHref>
							<a>
								<Image
									src={
										user.photoURL
											? user.photoURL
											: "https://avataaars.io/?avatarStyle=Circle"
									}
									alt="Profile picture"
									width={40}
									height={40}
									className="rounded-circle"
								/>
							</a>
						</Link>
					) : (
						<Nav>
							<Link href="/login" passHref>
								<NavLink>Login</NavLink>
							</Link>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
