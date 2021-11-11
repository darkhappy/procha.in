import { User } from "@firebase/auth";
import { createContext } from "react";

type userState = {
  user: User | undefined | null;
  username: string | null;
};

const initialUserState: userState = {
  user: null,
  username: null,
};

export const UserContext = createContext(initialUserState);
