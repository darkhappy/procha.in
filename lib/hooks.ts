import { auth, firestore } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase9-hooks/auth";
import { onSnapshot, doc } from "@firebase/firestore";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;
    console.log("yeehaw");

    if (user) {
      const ref = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
      console.log(">.<");
    } else {
      setUsername(null);
      console.log("oops");
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
