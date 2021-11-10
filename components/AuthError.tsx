import Link from "next/link";
import React from "react";

export default function AuthError() {
  return (
    <>
      <h1>403: Permissioned denied</h1>
      <p>Looks like you don&apos;t have access to this page.</p>
      <Link href="/login">Try signing in?</Link>
    </>
  );
}
