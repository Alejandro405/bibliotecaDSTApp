import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <<<< import it here
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookService } from './book.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
