import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
//import { PetService } from './pet.service';
import { PetTestService } from './pet.service.test';
import { AsyncPipe } from '@angular/common';
import { Pet } from './pet.type';

@Component({
  selector: 'app-list',
  imports: [MatListModule,CommonModule,RouterModule],
  template: `
    <div class="list-container">
    <img src="assets/images/pet/petList.png" alt="Pet List"/>
    <h2>Pet List</h2>
    <!-- <button (click)="add()">Add new pet</button>
    @for(pet of pets(); track pet._id){
      <li>{{pet._id}} {{pet.name}}</li>

    }@empty {
      <p>no pets found.</p>
    } -->
    <mat-list>
    <mat-list-item *ngFor="let pet of pets()">
      <!-- <img mat-list-avatar [src]="pet.image_path" alt="{{ pet.name }}" /> -->
      <a mat-line [routerLink]="['/pets', pet._id]">{{ pet.name }}</a>
       <!-- <p mat-line>{{ pet.kind }} - {{ pet.breed }} (Age: {{ pet.age }}, Gender: {{ pet.gender }})</p> -->
    </mat-list-item>
  </mat-list>

  <p *ngIf="pets().length === 0">No pets found.</p>
  </div>
  `,
  styles: [`
      h2 {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
    }
      .list-container {
      width: 100%;
      max-width: 420px;
      margin: 50px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      flex-direction: column;
      align-items: center;
      
    }


      .list-container img {
          width: 50px; 
          height: 50px;
          margin-right: 10px; 
        }

      .list-container button {
      width: calc(100% - 50%); 
      padding: 10px;
      background-color: #1d6da8;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
      margin-top: 15px;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }

 

    
    `]
})
export class ListComponent {
  #router = inject(Router);
  //#petService = inject(PetService);
  #petTestService = inject(PetTestService);
  pets = signal<Pet[]>([]);
  
  constructor() {
    // this.#petService.get_pets().subscribe(response => {
    //   if (response.success) this.pets.set(response.data);
    // });
    this.#petTestService.get_pets().subscribe(response => {
      console.log("Pet Test Service " + JSON.stringify(response.data))
      if (response.success) this.pets.set(response.data);
    });
  }
  add() {
    this.#router.navigate(['', 'pets', 'add']);
  }
}
