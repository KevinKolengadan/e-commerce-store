import { UserService } from '../services/user.service';
import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AppState} from '../state/app.state';
import {selectUser} from '../state/app.selectors';
import {UpdateUserModel, User} from '../model/user.model';
import {updateUser} from '../state/user.actions';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MustMatch} from '../validators/must-match.validator';

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
  }, {
    validator: MustMatch('password', 'repeatPassword')
  });
  userId: number;
  hide = true;
  hideRepeat = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private userService: UserService,
    private snackBar: MatSnackBar
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
        password: user?.password ? user?.password : '',
        repeatPassword: user?.password ? user?.password : '',
      });
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: UpdateUserModel = {
        email: this.userForm.controls.email.value,
        username: this.userForm.controls.username.value,
        firstname: this.userForm.controls.firstname.value,
        lastname: this.userForm.controls.lastname.value,
        address: {
          street: this.userForm.controls.street.value,
          city: this.userForm.controls.city.value
        },
        zipcode: this.userForm.controls.zipcode.value,
        number: this.userForm.controls.number.value,
        geolocation: {
          lat: this.userForm.controls.lat.value,
          long: this.userForm.controls.long.value
        },
        phone: this.userForm.controls.phone.value
      };
      if (this.userForm.controls.password.value) {
        newUser.password = this.userForm.controls.password.value;
      }
      this.loading = true;
      this.userService.updateUser(this.userId, newUser).subscribe((user: User) => {
        this.snackBar.open('User Details updated successfully', 'Dismiss', {duration: 3000});
        this.store.dispatch(updateUser(user));
        this.loading = false;
      });
    } else {
      this.userForm.markAsDirty();
    }
  }
}
