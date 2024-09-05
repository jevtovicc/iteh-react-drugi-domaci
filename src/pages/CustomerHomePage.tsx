import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { BookFormat } from '../types';
import axios from 'axios';

const CustomerHomePage: React.FC = () => {

    const [bookFormats, setBookFormats] = useState<BookFormat[]>([])

    useEffect(() => {
        axios.get<BookFormat[]>('http://localhost:8080/api/book-formats')
            .then(response => {
                console.log(response.data)
                setBookFormats(response.data)
            })
            .catch(error => console.log('Error fetching book formats', error))
    }, [])

    return (
        <BookList bookFormats={bookFormats} />
    );
};

export default CustomerHomePage;