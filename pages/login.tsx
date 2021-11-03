import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { signInWithPopup, signOut } from "@firebase/auth";
import { Button, Container, Form } from "react-bootstrap";
import React, {
	ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { UserContext } from "../lib/context";
import { doc, getDoc } from "@firebase/firestore";
import { debounce } from "lodash";

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
	const [formValue, setFormValue] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const { user, da } = useContext(UserContext);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.toLowerCase();
		const re = /^[0-9]{7}$/;

		if (val.length != 7) {
			setFormValue(val);
			setLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setLoading(true);
			setIsValid(false);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const checkDA = useCallback(
		debounce(async (da) => {
			if (da.length == 7) {
				const ref = doc(firestore, "das/", da);
				setIsValid(!(await getDoc(ref)).exists());
				setLoading(false);
			}
		}, 500),
		[]
	);

	useEffect(() => {
		checkDA(formValue);
	}, [checkDA, formValue]);

	return (
		<section>
			<h3>Quelques informations</h3>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label>DA</Form.Label>
					<Form.Control
						type="number"
						placeholder="1234567"
						value={formValue}
						onChange={onChange}
					/>
					<Form.Text>
						Le DA sert comme clé unique. Vous pouvez mettre un nom d{"'"}
						utilisateur personalisé plus tard.
					</Form.Text>
				</Form.Group>
				<Button type="submit" variant="primary" disabled={!isValid}>
					Choose
				</Button>
			</Form>
		</section>
	);
}
