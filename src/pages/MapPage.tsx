import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Store } from '../types';

const MapPage: React.FC = () => {

    const { storeId } = useParams<{ storeId: string }>();
    const [store, setStore] = useState<Store | null>(null)
    const [center, setCenter] = useState<[number, number] | null>(null);
    const [zoom] = useState(18);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/stores/${storeId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log(response.data)
                setStore(response.data)
            })
            .catch(e => console.log(e))
    }, [storeId])

    const getCoordinates = async (address: string): Promise<[number, number] | null> => {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: address,
                    format: 'json',
                    limit: 1
                }
            });

            const data = response.data[0];

            if (data) {
                return [parseFloat(data.lat), parseFloat(data.lon)];
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }

        return null;
    };

    useEffect(() => {
        const fetchCoordinates = async () => {
            const address = store?.location;
            if (address) {
                const coordinates = await getCoordinates(address);
                if (coordinates) {
                    setCenter(coordinates);
                }
            }
        };

        fetchCoordinates();
    }, [store?.location]);

    if (!center) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh' // Make sure it fills the entire viewport height
        }}>
            <div>
                <h1 style={{ textAlign: 'center' }}>{store?.name} - {store?.location}</h1>
                {store && <MapComponent center={center} zoom={zoom} markers={[{ position: center, popupText: store.location }]} />}
            </div>
        </div>
    );
};

export default MapPage;