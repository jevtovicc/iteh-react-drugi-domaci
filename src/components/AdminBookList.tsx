import { useEffect, useState } from "react"
import { Book, BookFormat } from "../types"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap"
import BookCard from "./BookCard"
import AdminBookCard from "./AdminBookCard"

const AdminBookList: React.FC = () => {

    const [bookFormats, setBookFormats] = useState<BookFormat[]>([])

    useEffect(() => {
        axios.get<BookFormat[]>('http://localhost:8080/api/book-formats', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response.data)
                setBookFormats(response.data)
            })
            .catch(error => console.log('Error fetching book formats', error))
    }, [])

    return (
        <Container className='mt-4'>
            {Array.from({ length: 4 }, (_, index) => (
                <Row key={index} className="mb-4">
                    {bookFormats.slice(4 * index, 4 * index + 4).map(bf => (
                        <Col key={bf.bookFormatId}>
                            <AdminBookCard bookFormat={bf} />
                        </Col>
                    )
                    )}
                </Row>
            ))}
        </Container>
    )
}

export default AdminBookList