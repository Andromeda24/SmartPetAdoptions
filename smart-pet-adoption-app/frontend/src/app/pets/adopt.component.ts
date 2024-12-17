import { Component, inject,signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetService } from './pet.service';
import { Pet,Gender,Kind } from './pet.type';
import { User,Role } from '../users/user.type'
import { Router } from '@angular/router';
import { StateService } from '../state.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-adopt',
  imports: [ReactiveFormsModule,CommonModule],
  template: `
   <form [formGroup]="form" (ngSubmit)="adopt()" class="adopt-container">
      <label for="petId">Pet Name :</label> 
      <select id="petId" formControlName="petId">
      <option *ngFor="let pet of pets()" [value]="pet._id">{{ pet.name }}</option>
      </select>
      <label for="userId">User Name :</label> 
        <select id="userId" formControlName="userId">
        <option *ngFor="let user of users()" [value]="user?._id">{{ user.name }}</option>
      </select>
      <button [disabled]="form.invalid">Adopt Pet</button>
   </form>
  `,
  styles: [`
     .adopt-container {        
        display: grid; 
        grid-template-columns: 150px 1fr; 
        gap: 10px 20px;
        width: 50%;
        margin: 20px auto;
        padding: 20px 30px 20px 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1);     
       }

    `]
})
export class AdoptComponent {
  #state_service = inject(StateService);
  #storedState = localStorage.getItem('SPA_APP_STATE');
  #router = inject(Router);
  #petService = inject(PetService);
  #userService = inject(UsersService);
  pets = signal<Pet[]>([]);
  users = signal<User[]>([]);
  displayedColumns: string[] = ['name', 'description','breed','actions'];
  user_role :string | null = null; 
  admin_role = Role.Admin.toLocaleLowerCase();  
  petOptions: { value: string | null; label: string; }[] = [];

  constructor() {    
    this.loadPets();
       
      }

 form = inject(FormBuilder).nonNullable.group({
  'petId': ['', Validators.required],
  'userId': ['', Validators.required]     
});


 loadPets(): void {
   if(this.isAdmin()){
     this.#petService.get_pets(10).subscribe(response => {
       if (response.success) {       
        this.pets.set(response.data);     
       }
     });      

     this.#userService.get_users(Role.Seeker.toString()).subscribe(response => {
      if (response.success) {
        this.users.set(response.data)
      }
     });    
   }   
 }

 isAdmin(): boolean {
   if (this.#storedState) {
     const parsedState = JSON.parse(this.#storedState);
     const user_role = parsedState.role.toLocaleLowerCase().trim();     
     return user_role === this.admin_role;
   }
   return false;
 }

adopt() {
  console.log('edit Pet ****')
  //userId: string,petId : string
  let filteredPet: Pet | undefined = this.pets().find((pet) => pet._id === this.form.controls.petId.value);
  if(typeof filteredPet!== 'undefined'){
    filteredPet.ownerId = this.form.controls.userId.value;


    
  console.log('Updating Pet Filter Owner ID:'+filteredPet.ownerId);
    this.#petService.put_pet(filteredPet).subscribe(response => {
      if (response.success) {
        this.#router.navigate(['', 'pets']); 
      }
    });
  }  

  //this.#router.navigate(['/pets/update/', petId]);
}
}
