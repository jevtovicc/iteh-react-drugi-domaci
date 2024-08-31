import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Knjiga } from '../types';
import { Card } from 'react-bootstrap';

const DetaljiKnjige: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [knjiga, setKnjiga] = useState<Knjiga | null>(null);

    useEffect(() => {
        console.log("Idem po knjige")
        axios.get<Knjiga>(`http://localhost:8080/api/knjige/${id}`)
            .then(response => setKnjiga(response.data))
            .catch(error => console.error('Greška prilikom preuzimanja knjige:', error));
    }, [id]);

    const dodajUKorpu = () => {
        // Logika za dodavanje knjige u korpu (može biti POST zahtev ka serveru)
        console.log('Dodavanje knjige u korpu:', knjiga);
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{knjiga?.naziv}</Card.Title>
                <Card.Text>{knjiga?.autor.imePrezime}</Card.Text>
            </Card.Body>
        </Card>
        //     <div>
        //         {knjiga ? (
        //             <div>
        //                 <h1>{knjiga.naziv}</h1>
        //                 <p>ISBN: {knjiga.isbn}</p>
        //                 <p>Autor: {knjiga.autor.imePrezime}</p>
        //                 <button onClick={dodajUKorpu}>Dodaj u Korpu</button>
        //             </div>
        //         ) : (
        //             <p>Učitavanje...</p>
        //         )}
        //     </div>
    );
};

export default DetaljiKnjige;