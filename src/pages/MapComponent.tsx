import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface MapComponentProps {
    center: [number, number];
    zoom: number;
    markers?: Array<{ position: [number, number]; popupText: string }>;
}

const markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
});

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom, markers = [] }) => {
    return (
        <MapContainer center={center} zoom={zoom} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    icon={markerIcon}
                >
                    <Popup>{marker.popupText}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;