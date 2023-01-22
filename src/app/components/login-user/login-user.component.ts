import { NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/entities/User';
import { LoginUserService } from 'src/app/services/login-user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  public users: User[] = []; 
  
  nick: any;
  password: any;
  
  constructor(private loginService: LoginUserService, private router: Router, private cookie: CookieService) { }

  ngOnInit(): void {  
    this.getUsers();
  }

  public getUsers(): void {
    this.loginService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onSignIn(addForm: NgForm): void {
    const loginForm = addForm;
    console.log(addForm.value);
    this.loginService.contaUserByNick(loginForm.value).subscribe(
      (response: User) => {
        // Redireccionamiento al componente del catálogo
        this.cookie.set("SessionStatus", "Logged")
        this.router.navigateByUrl('catalog');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
