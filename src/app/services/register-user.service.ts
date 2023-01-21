import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { User } from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  private apiServerUrl = environment.apiBaseUrl.concat("/user");

  constructor(private http: HttpClient) { }

  public saveUser(user: User | undefined): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/add`, user);
  }

  public validNick(user: User | undefined): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/getByName/${user?.nick}`);
  }
}
