import { auth, googleAuthProvider } from "../lib/firebase";
import { signInWithPopup, signOut } from "@firebase/auth";
import { Button, Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Enter() {
	const { user, da } = useContext(UserContext);

	// 1. user signed out <SignInButton />
	// 2. user signed in, but missing username <UsernameForm />
	// 3. user signed in, has username <SignOutButton />
	return (
		<Container>
			{user ? (
				!da ? (
					<>
						<UsernameForm />
					</>
				) : (
					<>
						Sign out?
						<SignOutButton />
					</>
				)
			) : (
				<>
					<h1>Sign in</h1>
					<SignInButton />
				</>
			)}
		</Container>
	);
}

// Sign in with Google button
function SignInButton() {
	const googleSignIn = async () => {
		await signInWithPopup(auth, googleAuthProvider);
	};

	return (
		<Button onClick={() => googleSignIn()} variant="outline-primary">
			Sign in with Google
		</Button>
	);
}

// Sign out button
function SignOutButton() {
	return (
		<Button onClick={() => signOut(auth)} variant="outline-secondary">
			Sign out
		</Button>
	);
}

function UsernameForm() {
	return null;
}
