import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './main/main.component';
import { FoodsComponent } from './foods/foods.component';
import { LocalizationComponent } from './localization/localization.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { SucessOrderComponent } from './sucess-order/sucess-order.component';
import { SeeOrdersComponent } from './see-orders/see-orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PersonalMenuComponent } from './personal-menu/personal-menu.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'deposit',
    component: LocalizationComponent,
  },
  {
    path: 'food',
    component: FoodsComponent,
  },
  {
    path: 'detail',
    component: MenuDetailsComponent,
  },
  {
    path: 'sucess',
    component: SucessOrderComponent,
  },
  {
    path: 'watch',
    component: SeeOrdersComponent,
  },
  { path: 'menu-usr', component: PersonalMenuComponent },

  {
    path: 'profile',
    component: PerfilComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
