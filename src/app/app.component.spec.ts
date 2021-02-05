import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {UserService} from './services/user.service';
import {ProductService} from './services/product.service';
import {UserServiceMock} from '../../mocks/user.service.mock';
import {ProductServiceMock} from '../../mocks/product.service.mock';
import {AppModule} from './app.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: UserService, useClass: UserServiceMock},
        { provide: ProductService, useClass: ProductServiceMock}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'e-commerce-store'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('e-commerce-store');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button span h3')?.textContent).toContain('CKart');
  });


  it('should render the name of the user', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('span.user-name')?.textContent).toContain('Hi john');
  });

  it('should render the number of products in the cart', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('span.mat-badge-content')?.textContent).toContain('3');
  });

});
