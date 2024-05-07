import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = signal('');
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  private base_url = 'http://localhost:8080/api/users';

  registerUser(data: any) {
    return this.http.post(this.base_url + '/register', data);
  }

  loginUser(data: any) {
    return this.http.post(this.base_url + '/login', data).pipe(
      tap((res: any) => {
        localStorage.setItem('Access Token', res.data.accessToken);
        localStorage.setItem(
          'Current User',
          JSON.stringify(res.data.loggedInUser)
        );

        this.isAuthenticated.next(true);
        this.currentUser.set(res.data.loggedInUser);
      })
    );
  }

  logoutUser() {
    localStorage.removeItem('Access Token');
    localStorage.removeItem('Current User');
    this.isAuthenticated.next(false);
    this.currentUser.set('');
  }

  getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }

  getCurrentUser() {
    return this.currentUser();
  }
}
