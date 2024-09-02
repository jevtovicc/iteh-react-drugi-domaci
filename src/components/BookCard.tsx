import { Button, Card } from "react-bootstrap";
import { BookFormat } from "../types";
import { useCart } from "../context/CartContext";

interface BookCardProps {
    bookFormat: BookFormat;
}

const BookCard: React.FC<BookCardProps> = ({ bookFormat }) => {

    const { addToCart } = useCart();

    return (
        <Card style={{ width: '12rem', padding: '20px' }}>
            <Card.Img variant="top" src={`http://localhost:8080/${bookFormat.coverImagePath}`} />
            <Card.Body>
                <Card.Title>{bookFormat.book.title}</Card.Title>
                <Card.Text>{bookFormat.book.author.fullName}</Card.Text>
                <Card.Text>{bookFormat.price} RSD</Card.Text>
                {bookFormat.available ?
                    <Button
                        variant="primary"
                        onClick={() => addToCart(bookFormat)}>
                        Dodaj u korpu
                    </Button>
                    :
                    <Card.Text>Trenutno nije na stanju</Card.Text>
                }
            </Card.Body>
        </Card>
    )
}


export default BookCard;