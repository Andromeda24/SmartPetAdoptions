import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './user.type';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  #http = inject(HttpClient);

  signin(user: User) {
    return this.#http.post<{ success: boolean, data: { token: string; }; }>(environment.SERVER_URL + 'users/login', user);
  }

  singup(data: FormData) {  
    const formDataObject = Object.fromEntries(data.entries());   
    return this.#http.post<{ success: boolean, data: string; }>(environment.SERVER_URL + 'users/signup', formDataObject);
  }
}
