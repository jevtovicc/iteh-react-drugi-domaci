import { Button, Card, Spinner } from "react-bootstrap";
import { Book } from "../types";
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Dodajte stilove za toast
import { useNavigate } from "react-router-dom";

interface BookCardProps {
    book: Book;
}

const AdminBookCard: React.FC<BookCardProps> = ({ book }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDeleteBook = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/books/${book.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLoading(false);
            toast.success('Knjiga uspesno obrisana'); // Prikaži toast obaveštenje
            setTimeout(() => window.location.reload(), 1000)
            // window.location.reload(); // Ili osveži listu knjiga
        } catch (error) {
            setLoading(false);
            toast.error('Greska prilikom brisanja knjige'); // Obaveštenje o grešci
            console.error('Error deleting the book:', error);
        }
    };

    return (
        <>
            <Card style={{ width: '12rem', padding: '20px' }}>
                <Card.Img variant="top" src={`http://127.0.0.1:8000/${book.cover_image_path}`} />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.author.name}</Card.Text>
                    <Card.Text>{book.price} RSD</Card.Text>

                    <div className="d-flex justify-content-between">
                        <Button variant="primary" onClick={() => navigate(`/admin/edit-book/${book.id}`)} disabled={loading}>
                            <FaEdit /> {/* Edit Icon */}
                        </Button>
                        <Button variant="danger" onClick={handleDeleteBook} disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : <FaTrash />}
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {/* Toast container */}
            <ToastContainer />
        </>
    );
};

export default AdminBookCard;