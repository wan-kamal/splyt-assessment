import './map.module.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useContext } from 'react';
import { OfficeLocationContext, TaxisLocationContext } from '../context';
import { Office } from '../models';
import { Driver } from '@data-access';

export function Map() {
  const { drivers, setDrivers } = useContext<{drivers: Driver[], setDrivers: (args: Driver[]) => void}>(TaxisLocationContext);
  const { office, setOffice } = useContext<{office: Office, setOffice: (args: Office) => void}>(OfficeLocationContext);

  const icon: L.DivIcon = L.divIcon({
    className: 'taxi-icon',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
  });

  const ChangeView = ({ center } : any) => {
    const map = useMap();
    map.setView(center);
    return null;
  }

  return (
    <div>
      <h5 className="card-title">Map</h5>
      <h6 className="card-subtitle mb-2 text-muted">
        View Available Taxis Here
      </h6>
      <MapContainer
        center={[office.latitude, office.longitude]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <ChangeView center={[office.latitude, office.longitude]}/>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[office.latitude, office.longitude]}>
          <Popup><strong>{office.name}</strong></Popup>
        </Marker>
        {drivers.map((driver: Driver, index: number) => (
          <Marker
            icon={icon}
            key={index}
            position={[driver.location.latitude, driver.location.longitude]}
          >
            <Popup>
              <strong>
                TAXI
              </strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
