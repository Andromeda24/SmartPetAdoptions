import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Pet } from './pet.type';

export interface StandardResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})

export class PetService {

  #http = inject(HttpClient);

  get_pets(page: number = 1) {
    return this.#http.get<StandardResponse<Pet[]>>(environment.SERVER_URL + 'pets/?page=' + page);
  }
  get_pet(pet_id: string) {
    return this.#http.get<StandardResponse<number>>(environment.SERVER_URL + `pets/${pet_id}`);
  }

  post_pet(pet: Pet) {
    return this.#http.post<StandardResponse<Pet>>(environment.SERVER_URL + 'pets/', pet);
  }
  put_pet(pet: Pet) {
    return this.#http.put<StandardResponse<number>>(environment.SERVER_URL + `pets/${pet._id}`, pet);
  }
  delete_pet(pet_id: string) {
    return this.#http.delete<StandardResponse<number>>(environment.SERVER_URL + `pets/${pet_id}`);
  }
}
