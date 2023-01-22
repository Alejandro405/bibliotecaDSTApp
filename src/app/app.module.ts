import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <<<< import it here
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookService } from './services/book.service';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserService } from './services/login-user.service';
import { CatalogGuardGuard } from './catalog-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    RegisterUserComponent,
    CatalogComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:'', component: LoginUserComponent},
      {path: 'catalog',canActivate: [CatalogGuardGuard], canLoad: [CatalogGuardGuard], component: CatalogComponent},
      {path: 'login', component: LoginUserComponent},
      {path: 'register', component: RegisterUserComponent}
    ]),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
