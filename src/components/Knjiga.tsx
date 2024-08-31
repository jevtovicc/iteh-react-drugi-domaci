import React from 'react';
import { Card } from 'react-bootstrap';

interface KnjigaProps {
    nazivKnjige: string;
    nazivAutora: string;
    cena: number;
}

const Knjiga: React.FC<KnjigaProps> = ({ nazivKnjige, nazivAutora, cena }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{nazivKnjige}</Card.Title>
                <Card.Text>{nazivAutora}</Card.Text>
                <Card.Text>{cena}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Knjiga;