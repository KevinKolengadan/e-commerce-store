import {Observable, of} from 'rxjs';
import {UpdateUserModel, User} from '../src/app/model/user.model';

export class UserServiceMock {
  getMockUser(): User {
    return {
      address: {
        geolocation: {
          lat: '-37.3159',
          long: '81.1496'
        },
        city: 'kilcoole',
        street: 'new road',
        number: 7682,
        zipcode: '12926-3874'
      },
      id: 1,
      email: 'john@gmail.com',
      username: 'johnd',
      password: 'm38rmF$',
      name: {
        firstname: 'john',
        lastname: 'doe'
      },
      phone: '1-570-236-7033'
    };
  }

  getUser(userId: number): Observable<User> {
    return of(this.getMockUser());
  }
  updateUser(userId: number, user: UpdateUserModel): Observable<User> {
    const mockUser: User = {
      address: {
        geolocation: {
          lat: user.geolocation.lat,
          long: user.geolocation.long
        },
        city: user.address.city,
        street: user.address.street,
        number: user.number,
        zipcode: user.zipcode
      },
      id: userId,
      email: user.email,
      username: user.username,
      password: user.password,
      name: {
        firstname: user.firstname,
        lastname: user.lastname
      },
      phone: user.phone
    };
    return of(mockUser);
  }
}
