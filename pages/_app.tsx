import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/app";
import NavbarComponent from "../components/Navbar";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }: AppProps) {
	const userData = useUserData();

	return (
		<UserContext.Provider value={userData}>
			<NavbarComponent />
			<Component {...pageProps} />
		</UserContext.Provider>
	);
}

export default MyApp;
