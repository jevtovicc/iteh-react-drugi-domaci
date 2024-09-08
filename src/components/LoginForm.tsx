import { Button, Form } from "react-bootstrap";
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

const LoginForm: React.FC = () => {

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
                <Form.Label>Korisnicko ime</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <Form.Label className='mt-3'>Lozinka</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button type='submit' variant='primary' className="mt-4">Uloguj se</Button>
            </div>
        </Form>
    )
}

export default LoginForm;