import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

interface MapComponentProps {
  position: LatLngExpression;
  onClick: (e: L.LeafletMouseEvent) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ position, onClick }) => {
  return (
    <MapContainer center={position} zoom={13} className="h-96 w-full" onClick={onClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
