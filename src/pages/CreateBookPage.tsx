import React from 'react';
import CreateBookForm from '../components/CreateBookForm';

const CreateBookPage: React.FC = () => {
    return (
        <div className="container mt-4">
            <h2>Kreiraj knjigu</h2>
            <CreateBookForm />
        </div>
    );
};

export default CreateBookPage;