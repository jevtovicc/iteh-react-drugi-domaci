import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select, { SingleValue } from 'react-select';
import { BookFormat, Store } from '../types'; // Assuming you have type definitions
import axios from 'axios';

interface SelectOption {
    value: number;
    label: string;
}

const AddBookToStore: React.FC = () => {
    const [books, setBooks] = useState<SelectOption[]>([]);
    const [stores, setStores] = useState<SelectOption[]>([]);
    const [selectedBook, setSelectedBook] = useState<SelectOption | null>(null);
    const [selectedStore, setSelectedStore] = useState<SelectOption | null>(null);
    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {

        axios.get<BookFormat[]>('http://localhost:8080/api/book-formats') // Adjust the URL as needed
            .then(response => {
                setBooks(response.data.map(bookFormat => ({
                    value: bookFormat.bookFormatId,
                    label: `${bookFormat.book.title} (${bookFormat.isbn})`
                })));
            })
            .catch(error => {
                console.error('Error fetching books', error);
            });

        axios.get<Store[]>('http://localhost:8080/api/stores') // Adjust the URL as needed
            .then(response => {
                setStores(response.data.map(store => ({
                    value: store.storeId,
                    label: store.name
                })));
            })
            .catch(error => {
                console.error('Error fetching stores', error);
            });
    }, []);

    const handleBookChange = (selectedOption: SingleValue<SelectOption>) => {
        setSelectedBook(selectedOption);
    };

    const handleStoreSelect = (selectedOption: SingleValue<SelectOption>) => {
        setSelectedStore(selectedOption);
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuantity(parseInt(e.target.value))
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();


        // Book, {store_id, quantity}
        const data = {
            bookFormatId: selectedBook?.value,
            storeId: selectedStore?.value,
            quantity: quantity
        };

        axios.post('http://localhost:8080/api/book-copies/add-to-store', data) // Adjust the URL as needed
            .then(response => {
                alert('Book added to stores successfully');
            })
            .catch(error => {
                console.error('Error adding book to stores', error);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Add Book to Store</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBook">
                    <Form.Label>Select Book</Form.Label>
                    <Select
                        value={selectedBook}
                        options={books}
                        onChange={handleBookChange}
                        placeholder="Pronadji knjigu..."
                        isClearable
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Select Store</Form.Label>
                    <Select
                        options={stores}
                        onChange={handleStoreSelect}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Kolicina</Form.Label>
                    <Form.Control
                        type="number"
                        step="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        required
                    />
                </Form.Group>

                {/* {selectedStores.length > 0 && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Store Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedStores.map((storeItem, index) => (
                                <tr key={storeItem.store.value}>
                                    <td>{storeItem.store.label}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={storeItem.quantity}
                                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )} */}

                <Button variant="primary" type="submit" className="mt-3">
                    Dodaj
                </Button>

            </Form>
        </div>
    );
};

export default AddBookToStore;