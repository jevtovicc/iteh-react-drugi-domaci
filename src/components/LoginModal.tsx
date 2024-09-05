import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
    show: boolean;
    onHide: () => void;
}

interface LoginResponse {
    token: string
}

interface DecodedToken {
    sub: string;
    roles: string[];
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onHide }) => {

    const { setIsAuthenticated, setIsAdmin } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post<LoginResponse>('http://localhost:8080/login', formData)
            .then(response => {
                const { token } = response.data
                localStorage.setItem('token', token);
                setIsAuthenticated(true)

                const decodedToken = jwtDecode<DecodedToken>(token);
                const roles = decodedToken.roles || [];

                onHide()
                if (roles.includes('ROLE_ADMIN')) {
                    setIsAdmin(true)
                    navigate('/admin');
                } else if (roles.includes('ROLE_CUSTOMER')) {
                    setIsAdmin(false)
                } else {
                    navigate('/'); // Fallback or default page
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Prijava</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Korisnicko ime</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                        <Form.Label>Lozinka</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary'>Uloguj se</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;