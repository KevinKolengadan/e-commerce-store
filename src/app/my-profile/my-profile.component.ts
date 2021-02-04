import { UserService } from '../services/user.service';
import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AppState} from '../state/app.state';
import {selectUser} from '../state/app.selectors';
import {User} from '../model/user.model';
import {updateUser} from '../state/user.actions';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  userForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    username: [null, Validators.required],
    password: null,
    repeatPassword: null,
    firstname: [null, Validators.required],
    lastname: [null, Validators.required],
    city: [null, Validators.required],
    street: [null, Validators.required],
    number: [null, Validators.required],
    zipcode: [null, Validators.required],
    lat: [null, Validators.required],
    long: [null, Validators.required],
    phone: [null, Validators.required],
  });
  userId: number;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private userService: UserService,
  ) {
    this.userId = 0;
    this.store.pipe(select(selectUser)).subscribe((user) => {
      this.userId = user?.id ? user.id : 0;
      this.userForm.setValue({
        email: user?.email ? user?.email : '',
        username: user?.username ? user?.username : '',
        firstname: user?.name?.firstname ? user?.name?.firstname : '',
        lastname: user?.name?.lastname ? user?.name?.lastname : '',
        city: user?.address?.city ? user?.address?.city : '',
        street: user?.address?.street ? user?.address?.street : '',
        number: user?.address?.number ? user?.address?.number : '',
        zipcode: user?.address?.zipcode ? user?.address?.zipcode : '',
        lat: user?.address?.geolocation?.lat ? user?.address?.geolocation.lat : '',
        long: user?.address?.geolocation?.long ? user?.address?.geolocation.long : '',
        phone: user?.phone ? user?.phone : '',
        password: '',
        repeatPassword: '',
      });
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = {
        email: this.userForm.controls.email.value,
        username: this.userForm.controls.username.value,
        name: {
          firstname: this.userForm.controls.firstname.value,
          lastname: this.userForm.controls.lastname.value
        },
        address: {
          number: this.userForm.controls.number.value,
          street: this.userForm.controls.street.value,
          city: this.userForm.controls.city.value,
          zipcode: this.userForm.controls.zipcode.value
        },
        geolocation: {
          lat: this.userForm.controls.lat.value,
          long: this.userForm.controls.long.value
        },
        phone: this.userForm.controls.phone.value
      };
      if (this.userForm.controls.password.value) {
        newUser.password = this.userForm.controls.password.value;
      }
      this.userService.updateUser(this.userId, newUser).subscribe((user: User) => {
        this.store.dispatch(updateUser(user));
      });
    } else {
      this.userForm.markAsDirty();
    }
  }
}
