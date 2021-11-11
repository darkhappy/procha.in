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
import { doc, getDoc, writeBatch } from "@firebase/firestore";
import { debounce } from "lodash";
import { AppProps } from "next/app";

export default function Enter() {
	const { user, da } = useContext(UserContext);

	// 1. user signed out <SignInButton />
	// 2. user signed in, but missing username <UsernameForm />
	// 3. user signed in, has username <SignOutButton />
	return (
		<Container>
			<h1>Login page</h1>
			{user ? (
				!da ? (
					<>
						<UsernameForm />
					</>
				) : (
					<>
						<SignOutButton />
					</>
				)
			) : (
				<>
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
export function SignOutButton() {
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
				const ref = doc(firestore, "das", da);
				setIsValid(!(await getDoc(ref)).exists());
				setLoading(false);
			}
		}, 500),
		[]
	);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isValid) {
			// Create refs for both documents
			if (typeof user?.uid == "undefined") return;
			const userDoc = doc(firestore, "users", user?.uid);
			const daDoc = doc(firestore, "das", formValue);

			// Commit both docs together as a batch write.
			const batch = writeBatch(firestore);
			batch.set(userDoc, {
				da: formValue,
				photoURL: user?.photoURL,
				displayName: user?.displayName,
			});
			batch.set(daDoc, { uid: user?.uid });

			await batch.commit();
		}
	};

	useEffect(() => {
		checkDA(formValue);
	}, [checkDA, formValue]);

	return (
		<section>
			<h3>Quelques informations</h3>
			<Form onSubmit={onSubmit}>
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
				<UsernameMessage da={formValue} isValid={isValid} loading={loading} />
				<Button type="submit" variant="primary" disabled={!isValid}>
					Choose
				</Button>
			</Form>
		</section>
	);
}

function UsernameMessage({
	da,
	isValid,
	loading,
}: {
	da: string;
	isValid: boolean;
	loading: boolean;
}) {
	if (loading) {
		return <p>Recherche...</p>;
	} else if (isValid) {
		return <p className="text-success">{da} est disponible!</p>;
	} else if (da && !isValid) {
		return <p className="text-danger">Ce DA est déjà enregistré!</p>;
	} else {
		return <p></p>;
	}
}
