import { Card } from "react-bootstrap";
import { Event } from "../interfaces/event";

export default function EventCard({ name, classe, date, type, pond }: Event) {
  return (
    <Card className="mb-3">
      <Card.Header>{date.toLocaleDateString()}</Card.Header>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{classe.name}</Card.Subtitle>
        <Card.Text>
          Nous avons un {type} en {classe.name} le {date.toLocaleDateString()},
          à {date.toLocaleTimeString()}. Ceci compte pour <b>{pond}%</b>.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
