import { Button, Card } from "react-bootstrap";
import { BookFormat } from "../types";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { IoEllipse } from 'react-icons/io5';

interface BookCardProps {
    bookFormat: BookFormat;
}

const BookCard: React.FC<BookCardProps> = ({ bookFormat }) => {
    const { addToCart } = useCart();

    return (
        <Card style={{ width: '15rem', padding: '10px', display: 'flex', flexDirection: 'column' }} className="mb-4">
            <Card.Img
                variant="top"
                src={`http://localhost:8080/${bookFormat.coverImagePath}`}
                alt={bookFormat.book.title}
                style={{ flexShrink: 0, height: '200px', width: '100%', objectFit: 'contain' }} // Ensure image fits without cropping
            />
            <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
                <Card.Title className="font-weight-bold" style={{ flex: '0 1 auto', overflowWrap: 'break-word' }}>
                    {bookFormat.book.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{ flex: '0 1 auto', overflowWrap: 'break-word' }}>
                    {bookFormat.book.author.fullName}
                </Card.Subtitle>
                <div className="d-flex justify-content-between align-items-center mt-3" style={{ flex: '1 0 auto' }}>
                    <span className="text-primary">{bookFormat.price.toFixed(2)} RSD</span>
                    {bookFormat.available ? (
                        <Button variant="outline-primary" onClick={() => addToCart(bookFormat)}>
                            <FaShoppingCart />
                        </Button>
                    ) : (
                        <div style={{ color: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                            <IoEllipse size={20} />
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}

export default BookCard;