import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/entities/User';
import { RegisterUserService } from 'src/app/services/register-user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
nick: any;
password: any;
  constructor (private registerService: RegisterUserService, private router: Router, private cookieService: CookieService) { }

  public onSignUp(addForm: NgForm) {
    console.log(addForm.value);
    this.registerService.saveUser(addForm.value).subscribe(
      (response: User) => {
        this.cookieService.set("SessionStatus", "Logged");
        this.router.navigateByUrl("catalog");
      },
      (error: HttpErrorResponse) => {
        alert("Nombre de usuario ya registrado");
      }
    );
}
}
