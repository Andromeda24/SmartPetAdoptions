import { effect, Injectable, signal } from '@angular/core';
import { test_data } from './mock-data';

export type GlobalState = {
  name: string,
  email: string,
  _id: string,
  jwt: string;
};

export const initial_state = {
  name: '',
  email: '',
  _id: '',
  jwt: ''
};


@Injectable({
  providedIn: 'root'
})

export class StateService {
   //$state = signal<GlobalState>(initial_state);
   $state = signal<GlobalState>(test_data);

  
  spaeffect = effect(() => {
    localStorage.setItem('SPA_APP_STATE', JSON.stringify(this.$state()));
  });

  isLoggedIn() {
    return this.$state()._id ? true : false;
  }

 }
