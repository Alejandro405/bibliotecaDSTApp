import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { User } from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  private apiServerUrl = environment.apiBaseUrl.concat("/user");

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/all`);
  }

  public addUser(user: User | undefined): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/add`, user);
  }

  public updateUser(user: User | undefined): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/update`, user);
  }

  public deleteUser(userId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${userId}`);
  }

  /**
   * findUser
   * userID: number : Observable<User>  
   */
  public findUser(userID: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/get/${userID}`);    
  }

  public contaUserByNick(user: User | undefined): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/contains/nick=${user?.nick}`);
  }
}