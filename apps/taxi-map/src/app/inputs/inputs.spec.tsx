import { ajax } from 'rxjs/ajax';
import { SplytApiResponse } from '@data-access';
import { environment } from '../../environments/environment';

describe('Inputs', () => {
  // Integration Test
  it('should return data', () => {
    ajax
      .get<SplytApiResponse>(
        `http://localhost:3000/api/v1/taxis/${Math.random() * 100}/${
          Math.random() * 100
        }/${Math.round(Math.random() * 10)}`,
        // could be JWT, private key, anything
        {
          Authorization:
            'Bearer be561eb92abbac66faaa2b79f87663cf4aa1dfb32ff97dad08b3c0a2b3a6b6755c7e61543b219d0533681ebbb5b1f6b82b762f6b407610a663ea77b92680d15f',
        }
      )
      .toPromise()
      .then((resolved) => expect(resolved).toBeDefined());
  });

  it('nearest handler', () => {
    for (let i = 0; i < 5; i++) {
      const coords = { lat: Math.random() * 100, lng: Math.random() * 100 };
      const hypSG =
        (Math.abs(environment.sgOffice.latitude - coords.lat) +
          Math.abs(environment.sgOffice.longitude - coords.lng)) /
        2;
      const hypLdn =
        (Math.abs(environment.londonOffice.latitude - coords.lat) +
          Math.abs(environment.londonOffice.longitude - coords.lng)) /
        2;
      const nearestOffice =
        hypSG < hypLdn
          ? {
              name: environment.sgOffice.name,
              latitude: environment.sgOffice.latitude,
              longitude: environment.sgOffice.longitude,
            }
          : {
              name: environment.londonOffice.name,
              latitude: environment.londonOffice.latitude,
              longitude: environment.londonOffice.longitude,
            };
      hypSG < hypLdn
        ? expect(nearestOffice.name).toBe('Singapore Office')
        : expect(nearestOffice.name).toBe('London Office');
    }
  });
});
