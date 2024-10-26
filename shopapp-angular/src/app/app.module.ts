import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { OrderComponent } from './component/order/order.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { OrderDetailComponent } from './component/order-confirm/order.detail.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserProfileComponent } from './component/user-profile/user.profile.component';

import { FormsModule } from '@angular/forms'; 
import { 
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
// import { AdminComponent } from './component/admin/admin.component';
// import { OrderAdminComponent } from './component/admin/order/order.admin.component';
// import { ProductAdminComponent } from './component/admin/product/product.admin.component';
// import { CategoryAdminComponent } from './component/admin/category/category.admin.component';
import { AdminModule } from './component/admin/admin.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    DetailProductComponent,
    OrderDetailComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    AppComponent,
    //Admin
    // AdminComponent,
    // OrderAdminComponent,
    // ProductAdminComponent,
    // CategoryAdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, //added
    HttpClientModule, //added
    ReactiveFormsModule, //added
    AppRoutingModule,
    NgbModule, //added
    CommonModule, //added
    AdminModule, //added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent,
    //HomeComponent,
    //DetailProductComponent,
    //OrderComponent,
    //OrderDetailComponent,
    //LoginComponent,
    //RegisterComponent
  ]
})
export class AppModule { }
