import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {StoreModule} from '@ngrx/store';
import {userReducer} from './state/user.reducer';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {productsReducer} from './state/products.reducer';
import {cartReducer} from './state/cart.reducer';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {productFilterReducer} from './state/filter.reducer';

@NgModule({
  declarations: [
    AppComponent,
    MyProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    StoreModule.forRoot({
      user: userReducer,
      products: productsReducer,
      cart: cartReducer,
      productFilter: productFilterReducer
    }),
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    HttpClientModule,
    MatInputModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatSidenavModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
