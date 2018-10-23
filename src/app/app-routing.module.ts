import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import { ShopItemComponent } from './shop-item/shop-item.component';


const routes: Routes = [
  {path: '', component: ShopComponent },
  {path: 'shop', component: ShopComponent },
  {path: 'shop-item', component: ShopItemComponent },
  {path: 'lookbook', component: LookbookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
