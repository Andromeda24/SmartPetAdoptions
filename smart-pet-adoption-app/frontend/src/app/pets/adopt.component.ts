import { Component, inject,signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetService } from './pet.service';
import { Pet,Gender } from './pet.type';
import { Role } from '../users/user.type'
import { Router } from '@angular/router';
import { Kind } from './pet.type';
import { ViewChild } from '@angular/core';
import { StateService } from '../state.service';


@Component({
  selector: 'app-adopt',
  imports: [ReactiveFormsModule,CommonModule],
  template: `
   <!-- <form [formGroup]="form" (ngSubmit)="go()" class="adopt-container">
      <label for="gender">Gender :</label> 
      <select id="gender" [formControl]="form.controls.gender">
      <option *ngFor="let gender of genderOptions" [value]="gender">{{ gender }}</option>
      </select>
      <button [disabled]="form.invalid">Adopt Pet</button>
   </form> -->
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
 // @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
 // @ViewChild(MatSort, { static: false }) sort!: MatSort;
  #router = inject(Router);
  #petService = inject(PetService);
  pets = signal<Pet[]>([]);
 // petsDataSource = new MatTableDataSource<Pet>([]);
  displayedColumns: string[] = ['name', 'description','breed','actions'];
  user_role :string | null = null; 
  admin_role = Role.Admin.toLocaleLowerCase();  

  constructor() {    
    this.loadPets();
 }

 loadPets(): void {
   if(this.isAdmin()){
     this.#petService.get_pets(10).subscribe(response => {
       console.log("Pet Service  all" + JSON.stringify(response.data))
       if (response.success) {       
         this.pets.set(response.data.filter(p => p.ownerId === null));       
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
   this.#router.navigate(['', 'pets', 'add']);
 }
}
