import { useEffect, useState } from "react"
import { Book } from "../types"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap"
import BookCard from "./BookCard"
import AdminBookCard from "./AdminBookCard"

const AdminBookList: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        axios.get<Book[]>('http://localhost:8080/api/book-formats')
            .then(response => {
                console.log(response.data)
                setBooks(response.data)
            })
            .catch(error => console.log('Error fetching book formats', error))
    }, [])

    return (
        <Container className='mt-4'>
            {Array.from({ length: 4 }, (_, index) => (
                <Row key={index} className="mb-4">
                    {books.slice(4 * index, 4 * index + 4).map(book => (
                        <Col key={book.id}>
                            <AdminBookCard book={book} />
                        </Col>
                    )
                    )}
                </Row>
            ))}
        </Container>
    )
}

export default AdminBookList