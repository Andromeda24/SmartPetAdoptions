import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Pet } from './pet.type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

export interface StandardResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})

export class PetTestService {
  private apiUrl = '/assets/pets.json'; 
  constructor(private http: HttpClient) {}
  get_pets(): Observable<{ success: boolean; data: Pet[] }> {
    return this.http.get<{ success: boolean; data: Pet[] }>(this.apiUrl);
  }

  get_pet(id: string): Observable<{ success: boolean; data: Pet | null }> {
    return this.get_pets().pipe(
      map(response => {
        const pet = response.data.find(pet => pet._id === id);  // Assuming '_id' is the pet identifier
        if (pet) {
          return { success: true, data: pet };
        } else {
          return { success: false, data: null };  // Returning null if no pet is found
        }
      })
    );
  }

  // get_pet(pet_id: string) {
  //   return this.#http.get<StandardResponse<number>>(environment.SERVER_URL + `pets/${pet_id}`);
  // }

  // post_pet(pet: Pet) {
  //   return this.#http.post<StandardResponse<Pet>>(environment.SERVER_URL + 'pets/', pet);
  // }
  // put_pet(pet: Pet) {
  //   return this.#http.put<StandardResponse<number>>(environment.SERVER_URL + `pets/${pet._id}`, pet);
  // }
  // delete_pet(pet_id: string) {
  //   return this.#http.delete<StandardResponse<number>>(environment.SERVER_URL + `pets/${pet_id}`);
  // }
}
