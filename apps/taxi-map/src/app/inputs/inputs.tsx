import { useContext, useEffect, useState } from 'react';
import { timer } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import './inputs.module.css';
import { OfficeLocationContext, TaxisLocationContext } from '../context';
import { environment } from '../../environments/environment';
import { Driver, SplytApiResponse } from '@data-access'
import { Office } from '../models';

export function Inputs() {

  // const test = crypto.randomBytes(64).toString('hex');
  // console.log(test);

  const [ taxi, setTaxi ] = useState<number>(3);
  const { drivers, setDrivers } = useContext<{drivers: Driver[], setDrivers: (args: Driver[]) => void}>(TaxisLocationContext);
  const { office, setOffice } = useContext<{office: Office, setOffice: (args: Office) => void}>(OfficeLocationContext);

  useEffect(() => {
    const req = timer(0, 5000).pipe(
      exhaustMap(() => ajax.get<SplytApiResponse>(
        `http://localhost:3000/api/v1/taxis/${office.latitude}/${office.longitude}/${taxi}`,
        // could be JWT, private key, anything
        {Authorization: 'Bearer be561eb92abbac66faaa2b79f87663cf4aa1dfb32ff97dad08b3c0a2b3a6b6755c7e61543b219d0533681ebbb5b1f6b82b762f6b407610a663ea77b92680d15f'}
      ))
    ).subscribe({
      next: resolve => setDrivers(resolve.response.drivers),
      error: err => console.error(err)
    });
    return () => req.unsubscribe();
  }, [taxi, office])

  const nearestHandler = () => {
    navigator.geolocation?.getCurrentPosition((e) => {
      const coords = {lat: e.coords.latitude, lng: e.coords.longitude};
      const hypSG = (Math.abs(environment.sgOffice.latitude - coords.lat) + Math.abs(environment.sgOffice.longitude - coords.lng)) / 2
      const hypLdn = (Math.abs(environment.londonOffice.latitude - coords.lat) + Math.abs(environment.londonOffice.longitude - coords.lng)) / 2
      hypSG < hypLdn ?
      setOffice({name: 'Nearest Office', latitude: environment.sgOffice.latitude, longitude: environment.sgOffice.longitude})
      : setOffice({name: 'Nearest Office', latitude: environment.londonOffice.latitude, longitude: environment.londonOffice.longitude});
    })
  }

  return (
    <div>
      <h5>Office</h5>
      <h6 className="card-subtitle mb-2 text-muted">Select Office Here</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          value="Nearest Office"
          checked={office.name === 'Nearest Office'}
          onChange={(e) => nearestHandler()}
        ></input>
        <label className="form-check-label">Nearest</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          value="Singapore Office"
          checked={office.name === environment.sgOffice.name}
          onChange={(e) => setOffice({name: environment.sgOffice.name, latitude: environment.sgOffice.latitude, longitude: environment.sgOffice.longitude})}
        ></input>
        <label className="form-check-label">Singapore</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          value="London Office"
          checked={office.name === environment.londonOffice.name}
          onChange={(e) => setOffice({name: environment.londonOffice.name, latitude: environment.londonOffice.latitude, longitude: environment.londonOffice.longitude})}
          ></input>
        <label className="form-check-label">London</label>
      </div>
      <h5>No of Taxis</h5>
      <h6 className="card-subtitle mb-2 text-muted">
        Use the range to change the number of taxis
      </h6>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={taxi}
          readOnly
        ></input>
      </div>
      <input
        type="range"
        className="form-range"
        min="3"
        max="10"
        value={taxi}
        onChange={(e) => setTaxi(e.target.valueAsNumber)}
      ></input>
    </div>
  );
}

export default Inputs;
