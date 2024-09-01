import React from 'react';
import CreateBookForm from '../components/CreateBookForm';
import AddBookToStoreForm from '../components/AddBookToStoreForm';

const AddBookToStorePage: React.FC = () => {
    return (
        <div className="container mt-4">
            <h2>Dodaj knjigu u radnju</h2>
            <AddBookToStoreForm />
        </div>
    );
};

export default AddBookToStorePage;