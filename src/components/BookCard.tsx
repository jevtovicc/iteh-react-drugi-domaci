import { Button, Card, Toast, ToastContainer } from "react-bootstrap";
import { BookFormat } from "../types";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { IoEllipse } from 'react-icons/io5';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
    bookFormat: BookFormat;
}

const BookCard: React.FC<BookCardProps> = ({ bookFormat }) => {
    const { addToCart } = useCart();
    const [showToast, setShowToast] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // Track hover state for the author name
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(bookFormat);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Function to handle click on author and stop event propagation
    const handleAuthorClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent click from triggering the card's onClick
        navigate(`/authors/${bookFormat.book.author.authorId}/books`);
    };

    return (
        <>
            <Card
                style={{ width: '15rem', padding: '10px', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                className="mb-4"
                onClick={() => navigate(`/books/view-book/${bookFormat.bookFormatId}`)}
            >
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
                    <Card.Subtitle
                        className="mb-2 text-muted"
                        style={{
                            flex: '0 1 auto',
                            overflowWrap: 'break-word',
                            cursor: 'pointer',
                            color: isHovered ? '#007bff' : 'inherit', // Blue when hovered
                            textDecoration: isHovered ? 'underline' : 'none' // Underline on hover
                        }}
                        onMouseEnter={() => setIsHovered(true)} // Handle hover state
                        onMouseLeave={() => setIsHovered(false)} // Handle hover state
                        onClick={handleAuthorClick} // Handle author click with stopPropagation
                    >
                        {bookFormat.book.author.fullName}
                    </Card.Subtitle>
                    <div className="d-flex justify-content-between align-items-center mt-3" style={{ flex: '1 0 auto' }}>
                        <span className="text-primary">{bookFormat.price.toFixed(2)} RSD</span>
                        {bookFormat.available ? (
                            <Button variant="outline-primary" onClick={handleAddToCart}>
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

            <ToastContainer position="bottom-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} style={{ border: '2px solid green' }}>
                    <Toast.Header>
                        <strong className="me-auto">Korpa</strong>
                    </Toast.Header>
                    <Toast.Body>Knjiga je uspesno dodata u korpu</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default BookCard;