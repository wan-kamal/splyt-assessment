export interface Driver {
  driver_id: string;
  location: {
    bearing: number;
    latitude: number;
    longitude: number;
  }
}

export interface SplytApiResponse {
  drivers: Driver[];
  pickup_eta: number;
}
