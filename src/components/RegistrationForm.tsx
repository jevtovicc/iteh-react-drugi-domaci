import { Button, Col, Form, Row } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";



interface LoginResponse {
    token: string
}

interface DecodedToken {
    sub: string;
    roles: string[];
}

const RegistrationForm: React.FC = () => {

    const { setIsAuthenticated, setIsAdmin } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
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
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Ime</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Col>

                    <Col>

                        <Form.Label>Prezime</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Col>

                </Row>
            </Form.Group>
            <Form.Group>
                <Form.Label className='mt-3'>Email</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <Form.Label className="mt-3">Lozinka</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button type='submit' variant='primary' className="mt-4">Registruj se</Button>
            </div>
        </Form>
    )
}

export default RegistrationForm;