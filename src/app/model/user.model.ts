export interface User {
  id?: number;
  address: Address;
  geolocation: GeoLocation;
  email: string;
  name: Name;
  password?: string;
  phone: string;
  username: string;
}

export interface Address {
  city: string;
  geolocation?: GeoLocation;
  number: number;
  street: string;
  zipcode: string;
}

export interface Name {
  firstname: string;
  lastname: string;
}

export interface GeoLocation {
  lat: string;
  long: string;
}
