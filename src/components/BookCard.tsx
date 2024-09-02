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
            <Card.Img variant="top" src="https://delfi.rs/_img/artikli/2019/12/gospodar_prstenova_-_druzina_prstena_mek_povez_vv.jpg" />
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