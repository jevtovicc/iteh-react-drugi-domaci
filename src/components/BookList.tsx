import { Container, Row, Col } from "react-bootstrap";
import BookCard from "./BookCard";
import { BookFormat } from "../types";

const BookList: React.FC<{ bookFormats: BookFormat[] }> = ({ bookFormats }) => {
    const rows = Array.from({ length: Math.ceil(bookFormats.length / 4) }, (_, index) =>
        bookFormats.slice(4 * index, 4 * index + 4)
    );

    return (
        <Container className='mt-4'>
            {rows.map((books, rowIndex) => (
                <Row key={rowIndex} className="mb-4" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    {books.map(bf => (
                        <Col key={bf.bookFormatId} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch mb-3">
                            <BookCard bookFormat={bf} />
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    );
}

export default BookList;