import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { DashboardComponent } from './dashboard.component';
import {ProductService} from '../services/product.service';
import {ProductServiceMock} from '../../../mocks/product.service.mock';
import {AppModule} from '../app.module';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {UserServiceMock} from '../../../mocks/user.service.mock';

describe('ViewCartComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
  const initialState = {
    products: new ProductServiceMock().getMockProducts(),
    productFilter: '',
    cart: new ProductServiceMock().getMockCart(),
    user: new UserServiceMock().getMockUser()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        AppModule
      ],
      providers: [
        MatMenuModule,
        provideMockStore({initialState}),
        { provide: ProductService, useClass: ProductServiceMock}
        ]
    });
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should render all the products in the products store', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div.row mat-card').length).toBe(20);
  });

  it('should filter products if the category filter is used', () => {
    fixture.detectChanges();
    let compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div.row mat-card').length).toBe(20);

    component.selectedCategories.setValue(['men clothing']);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div.row mat-card').length).toBe(4);

    component.selectedCategories.setValue(['men clothing', 'jewelery']);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div.row mat-card').length).toBe(8);
  });
  it('should sort products according to the sorting logic', () => {
    fixture.detectChanges();
    let compiled = fixture.nativeElement;
    expect(compiled.querySelector('div.row mat-card .product-title')?.textContent).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');

    component.sortOrder.setValue('desc');
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    expect(compiled.querySelector('div.row mat-card .product-title')?.textContent).toBe('DANVOUY Womens T Shirt Casual Cotton Short');

    component.sortBy.setValue('price');
    component.sortOrder.setValue('desc');
    component.selectedCategories.setValue([]);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('div.row mat-card .price')[0]?.textContent).toBe('$999.99');
    expect(compiled.querySelectorAll('div.row mat-card .price')[1]?.textContent).toBe('$695.00');
    expect(compiled.querySelectorAll('div.row mat-card .price')[2]?.textContent).toBe('$599.00');
  });
});
