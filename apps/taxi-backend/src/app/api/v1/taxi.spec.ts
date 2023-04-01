import axios from 'axios';
import { SplytApiResponse } from '@data-access';


describe('Taxi', () => {
  // Integration Test
  it('should return data', async () => {
    // Mock data
    const request = {
      params: {
        latitude: Math.random() * 100,
        longitude:  Math.random() * 100,
        count: Math.round(Math.random() * 10)
      }
    }
    await axios.get<SplytApiResponse>(
      'https://qa-interview-test.splytech.dev/api/drivers',
      {params: {latitude: request.params.latitude, longitude: request.params.longitude, count: request.params.count }}
    ).then(resolved => {
      expect(resolved).toBeDefined()
    })
  })
})
