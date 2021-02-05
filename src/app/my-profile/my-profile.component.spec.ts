import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { MyProfileComponent } from './my-profile.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {ProductServiceMock} from '../../../mocks/product.service.mock';
import {UserServiceMock} from '../../../mocks/user.service.mock';
import {UserService} from '../services/user.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';


describe('MyProfileComponent', () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;
  let store: MockStore;
  const initialState = {
    products: new ProductServiceMock().getMockProducts(),
    productFilter: '',
    cart: new ProductServiceMock().getMockCart(),
    user: new UserServiceMock().getMockUser()
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSnackBarModule,
        FormsModule
      ],
      providers: [
        provideMockStore({initialState}),
        { provide: UserService, useClass: UserServiceMock}
      ]
    });
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });


  it('validate firstname is required', () => {

    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      firstname: ''
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.firstname.errors.required).toBeTruthy();
  });
  it('validate lastname is required', () => {

    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      lastname: ''
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.lastname.errors.required).toBeTruthy();
  });
  it('validate email is required and in email format', () => {

    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      email: ''
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.email.errors.required).toBeTruthy();

    component.userForm.patchValue({
      email: 'kevin'
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.email.errors.email).toBeTruthy();
  });

  it('validate phone is required', () => {

    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      phone: ''
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.phone.errors.required).toBeTruthy();
  });
  it('validate street number is required', () => {

    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      number: ''
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.number.errors.required).toBeTruthy();
  });
  it('validate street address is required', () => {

    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      street: ''
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.street.errors.required).toBeTruthy();
  });
  it('validate city is required', () => {

    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      city: ''
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.city.errors.required).toBeTruthy();
  });
  it('validate zipcode is required', () => {
    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      zipcode: ''
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.zipcode.errors.required).toBeTruthy();
  });
  it('validate lat is required', () => {
    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      lat: ''
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.lat.errors.required).toBeTruthy();
  });
  it('validate long is required', () => {
    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      long: ''
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.long.errors.required).toBeTruthy();
  });
  it('validate password and repeat matches', () => {
    expect(component.userForm.valid).toBeTruthy();
    fixture.detectChanges();
    component.userForm.patchValue({
      password: 'qwerty',
      repeatPassword: 'asdfg'
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.controls.repeatPassword.errors.mustMatch).toBeTruthy();
    component.userForm.patchValue({
      password: 'qwerty',
      repeatPassword: 'qwerty'
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBeTruthy();
  });
  it('validate update function', () => {
    fixture.detectChanges();
    expect(component.userForm.valid).toBeTruthy();
    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('#submit');
    component.userForm.patchValue({
      password: 'qwerty',
      repeatPassword: 'qwert123y'
    });
    submitButton.click();
    fixture.detectChanges();
    let snackingDiv = document.querySelector('snack-bar-container');
    expect(snackingDiv).toBeNull();
    component.userForm.patchValue({
      password: 'qwerty',
      repeatPassword: 'qwerty'
    });
    submitButton.click();
    fixture.detectChanges();
    snackingDiv = document.querySelector('snack-bar-container');
    expect(snackingDiv).not.toBeNull();
  });
});
