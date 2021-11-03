import { User } from "@firebase/auth";
import { createContext } from "react";

type userState = {
	user: User | undefined | null;
	da: string | null;
};

const initialUserState: userState = {
	user: null,
	da: null,
};

export const UserContext = createContext(initialUserState);
