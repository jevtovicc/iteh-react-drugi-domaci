import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, FormControl, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { BookFormat } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface SearchComponentProps {
    onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<BookFormat[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [inputWidth, setInputWidth] = useState<number>(0);
    const navigate = useNavigate()

    useEffect(() => {
        if (searchTerm.length > 2) {
            axios.get<BookFormat[]>(`http://localhost:8080/api/book-formats/search?query=${searchTerm}`)
                .then(response => {
                    setSearchResults(response.data.slice(0, 5)); // Limit to 5 results
                    setShowResults(true);
                })
                .catch(error => console.error(error));
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    }, [searchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleInputRef = (node: HTMLInputElement) => {
        if (node) {
            setInputWidth(node.offsetWidth);
        }
    };

    const handleViewAllResults = () => {
        setShowResults(false)
        navigate(`/books/search?query=${encodeURIComponent(searchTerm)}`);
        setSearchTerm('')
    }

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <Form style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                    <FormControl
                        onChange={handleSearchChange}
                        type="text"
                        placeholder="Pretražite..."
                        className="mr-sm-2"
                        style={{
                            width: '100%',
                            height: '40px',
                            borderRadius: '0px',
                            padding: '0 40px 0 10px',
                            boxSizing: 'border-box',
                            border: 'none',
                            outline: 'none',
                        }}
                        value={searchTerm}
                        ref={handleInputRef}
                    />
                    <Button
                        onClick={handleViewAllResults}
                        variant="primary"
                        style={{
                            position: 'absolute',
                            right: '0',
                            top: '0',
                            height: '100%',
                            width: '40px',
                            borderRadius: '0',
                            padding: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'blue',
                            border: 'none',
                            boxShadow: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <FaSearch style={{ color: 'white' }} />
                    </Button>
                </div>
            </Form>

            {showResults && (
                <Dropdown.Menu show
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        width: `${inputWidth + 20}px`,
                        maxWidth: 'none',
                        zIndex: 1000,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        border: 'none',
                        borderRadius: '0',
                        marginTop: '5px',
                    }}
                >
                    {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                            <Dropdown.Item key={result.bookFormatId} href={`/books/${result.bookFormatId}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    whiteSpace: 'normal', // Allow text to wrap
                                    wordWrap: 'break-word', // Ensure long words break and wrap
                                }}
                            >
                                <img
                                    src={`http://localhost:8080/${result.coverImagePath}`} // Assuming coverImagePath is the URL of the image
                                    alt={result.book.title}
                                    style={{
                                        width: '50px',
                                        height: '75px',
                                        objectFit: 'cover',
                                        marginRight: '10px',
                                    }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <strong style={{ overflowWrap: 'break-word' }}>{result.book.title}</strong>
                                    <span style={{ overflowWrap: 'break-word' }}>
                                        {result.book.author.fullName} - {result.price.toFixed(2)} RSD
                                    </span>
                                </div>
                            </Dropdown.Item>
                        ))
                    ) : (
                        <Dropdown.Item disabled>Nema rezultata pretrage</Dropdown.Item>
                    )}
                    {searchResults.length > 0 &&
                        <>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleViewAllResults}>Pregledaj sve rezultate</Dropdown.Item>
                        </>
                    }
                </Dropdown.Menu>
            )}
        </div>
    );
};

export default SearchComponent;