import { Container } from "react-bootstrap";
import { SignOutButton } from "../login";

export default function UserProfilePage({}) {
	return (
		<Container>
			<h1>User Profile Page</h1>
			<SignOutButton />
		</Container>
	);
}
