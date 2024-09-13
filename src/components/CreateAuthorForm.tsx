import axios from "axios";
import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";


interface FormData {
    name: string;
    bio: string;
}

const CreateAuthorForm: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({ name: '', bio: '' })
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        axios.post('http://127.0.0.1:8000/api/authors', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                navigate('/admin/view-authors')
            })
            .catch(error => {
                alert('Error creating author: ' + error);
            });
    };



    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicAuthorName">
                <Form.Label>Naziv</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAuthorDescription">
                <Form.Label>Opis</Form.Label>
                <Form.Control
                    as="textarea"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Sacuvaj
            </Button>
        </Form>
    )
}

export default CreateAuthorForm