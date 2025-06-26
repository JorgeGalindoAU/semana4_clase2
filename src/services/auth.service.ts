import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ENDPOINT_URL_LOGIN: string = `${environment.api.url}/api/login`;
  private ENDPOINT_URL_REGISTER: string = `${environment.api.url}/api/register`;

  private ENDPOINT_API_HEADER: string = environment.api.headerName;
  private ENDPOINT_API_KEY: string = environment.api.apiKey;

  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);


  private readonly _userToken = signal<string>(localStorage.getItem('token') ?? '');
  private readonly _isUserLogged = computed(() => this._userToken() != '');

  public get isUserLogged() {
    const currentToken: string = localStorage.getItem('token') ?? '';
    this._userToken.set(currentToken);

    return this._isUserLogged();
  }


  login(email: string, password: string): void {
    this.httpClient.post(this.ENDPOINT_URL_LOGIN, {
      email: email,
      password: password,
    }, {
      headers: {
        [this.ENDPOINT_API_HEADER]: this.ENDPOINT_API_KEY,
      }
    }).subscribe(
      {
        next: (value: any) => {
          let token = value['token'];
          localStorage.setItem('token', token);

          this._userToken.set(token);

          this.router.navigate(['/menu']);
        },
        error: (err) => console.error(err)
      }
    );
  }

  register(email: string, password: string): void {
    this.httpClient.post(this.ENDPOINT_URL_REGISTER,
      {
        email: email,
        password: password,
      }, {
      headers: {
        [this.ENDPOINT_API_HEADER]: this.ENDPOINT_API_KEY,
      },
    }).subscribe(
      {
        next: (value: any) => {
          let token = value['token'];
          localStorage.setItem('token', token);

          this._userToken.set(token);
        },
        error: (err) => console.error(err)
      }
    );
  }

  logout() {
    localStorage.removeItem('token');

    this._userToken.set('');
  }
}
