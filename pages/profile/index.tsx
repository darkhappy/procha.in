import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import AuthError from "../../components/AuthError";
import { UserContext } from "../../lib/context";
import { SignOutButton } from "../login";

export default function UserProfilePage({}) {
  const { da } = useContext(UserContext);

  return (
    <Container>
      {da ? (
        <>
          <h1>User Profile Page</h1>
          <SignOutButton />
        </>
      ) : (
        <AuthError />
      )}
    </Container>
  );
}
