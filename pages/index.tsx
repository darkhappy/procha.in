import { Container } from "react-bootstrap";
import EventCard from "../components/EventCard";
import events from "../testing/events.json";

export default function Home() {
	return (
		<Container>
			<h1>procha.in</h1>
			{events.map((event) => {
				return (
					<EventCard
						key={event.id}
						name={event.title}
						date={new Date(event.date)}
						classe={event.classe}
						type={event.type}
						pond={event.pond}
					/>
				);
			})}
		</Container>
	);
}
