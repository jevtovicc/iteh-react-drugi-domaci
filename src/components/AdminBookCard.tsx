import { Button, Card } from "react-bootstrap";
import { BookFormat } from "../types";
import { useCart } from "../context/CartContext";

interface BookCardProps {
    bookFormat: BookFormat;
}

const AdminBookCard: React.FC<BookCardProps> = ({ bookFormat }) => {

    return (
        <Card style={{ width: '12rem', padding: '20px' }}>
            <Card.Img variant="top" src={`http://localhost:8080/${bookFormat.coverImagePath}`} />
            <Card.Body>
                <Card.Title>{bookFormat.book.title}</Card.Title>
                <Card.Text>{bookFormat.book.author.fullName}</Card.Text>
                <Card.Text>{bookFormat.price} RSD</Card.Text>

                <Button variant="primary" >Izmeni</Button>
                <Button variant="danger" >Obrisi</Button>
            </Card.Body>
        </Card>
    )
}


export default AdminBookCard;