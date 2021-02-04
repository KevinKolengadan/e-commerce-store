export interface User {
  id?: number;
  address: Address;
  email: string;
  name: Name;
  password?: string;
  phone: string;
  username: string;
}

export interface UpdateUserModel {
  address: Address;
  email: string;
  username: string;
  geolocation: GeoLocation;
  firstname: string;
  lastname: string;
  password?: string;
  phone: string;
  number: number;
  zipcode: string;
}

export interface Address {
  city: string;
  geolocation?: GeoLocation;
  number?: number;
  street: string;
  zipcode?: string;
}

export interface Name {
  firstname: string;
  lastname: string;
}

export interface GeoLocation {
  lat: string;
  long: string;
}
