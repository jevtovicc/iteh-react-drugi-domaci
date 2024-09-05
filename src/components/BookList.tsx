import { useEffect, useState } from "react"
import { Book, BookFormat } from "../types"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap"
import BookCard from "./BookCard"

const BookList: React.FC<{ bookFormats: BookFormat[] }> = ({ bookFormats }) => {

    return (
        <Container className='mt-4'>
            {Array.from({ length: 4 }, (_, index) => (
                <Row key={index} className="mb-4">
                    {bookFormats.slice(4 * index, 4 * index + 4).map(bf => (
                        <Col key={bf.bookFormatId}>
                            <BookCard bookFormat={bf} />
                        </Col>
                    )
                    )}
                </Row>
            ))}
        </Container>
    )
}

export default BookList