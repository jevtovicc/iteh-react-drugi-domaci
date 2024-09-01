import { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Author, Publisher, Store } from '../types';

interface FormData {
    title: string;
    description: string;
    isbn: string;
    pages: number;
    price: number;
}

interface SelectOption {
    value: number | string;
    label: string;
}

const formatOptions: SelectOption[] = [
    { value: 'Tvrd povez', label: 'Tvrd povez' },
    { value: 'Mek povez', label: 'Mek povez' }
];

const AddBookForm: React.FC = () => {

    const [authors, setAuthors] = useState<SelectOption[]>([]);
    const [selectedAuthor, setSelectedAuthor] = useState<SelectOption | null>(null);
    const [publishers, setPublishers] = useState<SelectOption[]>([]);
    const [selectedPublisher, setSelectedPublisher] = useState<SelectOption | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<SelectOption | null>(null);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        isbn: '',
        pages: 0,
        price: 0
    });

    useEffect(() => {
        // Fetch authors from the API
        axios.get<Author[]>('http://localhost:8080/api/authors') // Adjust the URL as needed
            .then(response => {
                setAuthors(response.data.map(author => ({
                    value: author.authorId,
                    label: author.fullName
                })));
            })
            .catch(error => {
                console.error('Error fetching authors', error);
            });

        axios.get<Publisher[]>('http://localhost:8080/api/publishers') // Adjust the URL as needed
            .then(response => {
                setPublishers(response.data.map(publisher => ({
                    value: publisher.publisherId,
                    label: publisher.publisherName
                })));
            })
            .catch(error => {
                console.error('Error fetching publishers', error);
            });

        axios.get<Store[]>('http://localhost:8080/api/stores') // Adjust the URL as needed
            .then(response => {
                setPublishers(response.data.map(store => ({
                    value: store.storeId,
                    label: store.name
                })));
            })
            .catch(error => {
                console.error('Error fetching publishers', error);
            });
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAuthorChange = (selectedOption: SingleValue<SelectOption>) => {
        setSelectedAuthor(selectedOption);
    };

    const handlePublisherChange = (selectedOption: SingleValue<SelectOption>) => {
        setSelectedPublisher(selectedOption);
    };

    const handleFormatChange = (selectedOption: SingleValue<SelectOption>) => {
        setSelectedFormat(selectedOption);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            ...formData,
            authorId: selectedAuthor?.value,
            publisherId: selectedPublisher?.value,
            format: selectedFormat?.value
        };

        axios.post('http://localhost:8080/api/books', data) // Adjust the URL as needed
            .then(response => {
                alert('Book created successfully');
            })
            .catch(error => {
                console.error('Error creating book', error);
            });
    };


    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicBookTitle">
                <Form.Label>Naziv</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="authorId">
                <Form.Label>Autor</Form.Label>
                <Select
                    value={selectedAuthor}
                    onChange={handleAuthorChange}
                    options={authors}
                    placeholder="Search for an author..."
                    isClearable
                    required
                />
            </Form.Group>

            <Form.Group controlId="publisherId">
                <Form.Label>Izdavac</Form.Label>
                <Select
                    value={selectedPublisher}
                    onChange={handlePublisherChange}
                    options={publishers}
                    placeholder="Search for a publisher..."
                    isClearable
                    required
                />
            </Form.Group>

            <Form.Group controlId="storeId">
                <Form.Label>Radnja</Form.Label>
                <Select
                    value={selectedPublisher}
                    onChange={handlePublisherChange}
                    options={publishers}
                    placeholder="Search for a publisher..."
                    isClearable
                    required
                />
            </Form.Group>

            <Form.Group controlId="format">
                <Form.Label>Format</Form.Label>
                <Select
                    value={selectedFormat}
                    onChange={handleFormatChange}
                    options={formatOptions}
                    placeholder="Select a format..."
                    isClearable
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBookDescription">
                <Form.Label>Opis</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="isbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="pages">
                <Form.Label>Broj stranica</Form.Label>
                <Form.Control
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="price">
                <Form.Label>Cena</Form.Label>
                <Form.Control
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Sacuvaj
            </Button>
        </Form >
    );
}

export default AddBookForm