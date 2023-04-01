import styles from './app.module.css';
import Map from './map/map';
import Inputs from './inputs/inputs';
import { useState } from 'react';
import { TaxisLocationContext, OfficeLocationContext } from './context';
import { environment } from '../environments/environment';
import { Office } from './models';
import { Driver } from '@data-access';

export function App() {

  const [ drivers, setDrivers ] = useState<Driver[]>([]);
  const [ office, setOffice ] = useState<Office>({
    name: environment.sgOffice.name,
    latitude: environment.sgOffice.latitude,
    longitude: environment.sgOffice.longitude
  });

  return (
    <div className={styles['app-container']}>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Taxi App</span>
        </div>
      </nav>
      <main className="container mt-4">
        <div className="card">
          <div className="card-body">
            <OfficeLocationContext.Provider value={{office, setOffice}}>
              <TaxisLocationContext.Provider value={{drivers, setDrivers}}>
                <Map></Map>
                <Inputs></Inputs>
              </TaxisLocationContext.Provider>
            </OfficeLocationContext.Provider>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
