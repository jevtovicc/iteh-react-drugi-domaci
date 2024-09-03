import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface SearchComponentProps {
    onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(searchQuery); // Pass the query to the parent component
    };

    return (
        <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="me-2" // Bootstrap spacing utility for margin-end
            />
            <Button variant="primary" type="submit">
                Search
            </Button>
        </Form>
    );
};

export default SearchComponent;