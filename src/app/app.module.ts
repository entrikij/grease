import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { LayoutComponent } from './layout/layout.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { LookbookComponent } from './lookbook/lookbook.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    LayoutComponent,
    ShopItemComponent,
    LookbookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
