import React, { useEffect, useState } from 'react';
import BookDetails from '../components/BookDetails';
import { useParams } from 'react-router-dom';
import { BookFormat } from '../types';
import axios from 'axios';


const BookDetailsPage: React.FC = () => {

    const { bookId } = useParams<{ bookId: string }>();
    const [bookFormat, setBookFormat] = useState<BookFormat | null>(null)

    useEffect(() => {
        axios.get<BookFormat>(`http://localhost:8080/api/book-formats/${bookId}`)
            .then(response => {
                console.log(response.data)
                setBookFormat(response.data)
            })
            .catch(e => console.log(e))
    }, [bookId])

    return (
        <BookDetails bookFormat={bookFormat} />
    );
};

export default BookDetailsPage;