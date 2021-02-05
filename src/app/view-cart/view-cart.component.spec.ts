import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { ViewCartComponent } from './view-cart.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {UserServiceMock} from '../../../mocks/user.service.mock';
import {ProductServiceMock} from '../../../mocks/product.service.mock';
import {ProductService} from '../services/product.service';

describe('ViewCartComponent', () => {
  let component: ViewCartComponent;
  let fixture: ComponentFixture<ViewCartComponent>;
  let store: MockStore;
  const initialState = {
    products: new ProductServiceMock().getMockProducts(),
    productFilter: '',
    cart: new ProductServiceMock().getMockCart(),
    user: new UserServiceMock().getMockUser()
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCartComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
      ],
      providers: [
        provideMockStore({initialState}),
        { provide: ProductService, useClass: ProductServiceMock}
      ]
    });

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('total number of items in cart check', () => {
    fixture.detectChanges();
    expect(component.productDetails.data.length).toBe(3);
  });
});
