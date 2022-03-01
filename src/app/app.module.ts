import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QRCodeModule } from 'angularx-qrcode';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';
import { HomeComponent } from './views/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { LocalizationComponent } from './localization/localization.component';
import { FoodsComponent } from './foods/foods.component';
import { MatCardModule } from '@angular/material/card';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { MatInputCounterModule } from '@angular-material-extensions/input-counter';
import { SucessOrderComponent } from './sucess-order/sucess-order.component';
import { SeeOrdersComponent } from './see-orders/see-orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PersonalMenuComponent } from './personal-menu/personal-menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    LocalizationComponent,
    FoodsComponent,
    MenuDetailsComponent,
    SucessOrderComponent,
    SeeOrdersComponent,
    NotFoundComponent,
    PersonalMenuComponent,
    PerfilComponent,
  ],
  imports: [
    MatDialogModule,
    ClipboardModule,
    QRCodeModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatInputCounterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
