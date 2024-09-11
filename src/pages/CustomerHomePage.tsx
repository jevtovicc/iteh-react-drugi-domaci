import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { Book } from '../types';
import axios from 'axios';

const CustomerHomePage: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/books')
            .then(response => {
                console.log(response.data['books'])
                setBooks(response.data['books'])
            })
            .catch(error => console.log('Error fetching book formats', error))
    }, [])

    return (
        <BookList books={books} />
    );
};

export default CustomerHomePage;