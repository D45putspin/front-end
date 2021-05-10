import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './main/main.component'
import { FoodsComponent } from './foods/foods.component'
import { LocalizationComponent } from './localization/localization.component'
import { MenuDetailsComponent } from './menu-details/menu-details.component'
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'teste',
    component: MainComponent
  },
  {
    path: 'local',
    component: LocalizationComponent
  },
  {
    path: 'food',
    component: FoodsComponent
  },
  {
    path: 'detail',
    component: MenuDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

