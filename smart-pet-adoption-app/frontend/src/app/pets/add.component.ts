import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetService } from './pet.service';
import { Pet } from './pet.type';
import { Gender } from './pet.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule,CommonModule],
  template: `
     <form [formGroup]="form" (ngSubmit)="go()" class="add-container">
       <div class="image-container">
        <img src="assets/images/pet/addPet.png" alt="Add Pet"/>
        <h2 class="add-text">Add Pet</h2>
      </div>
      <label></label>
      <label for="id">ID :</label>
      <input placeholder="id" [formControl]="form.controls._id"/>
      <label for="name">Name :</label>
      <input placeholder="name" [formControl]="form.controls.name"/>
      <label for="kind">Kind :</label>
      <input placeholder="kind" [formControl]="form.controls.kind"/>
      <label for="breed">Breed :</label>
      <input placeholder="breed" [formControl]="form.controls.breed"/>

      <label for="age">Age :</label>
      <input placeholder="age" [formControl]="form.controls.age"/>
      <label for="gender">Gender :</label> 
      <select id="gender" [formControl]="form.controls.gender">
      <option *ngFor="let gender of genderOptions" [value]="gender">{{ gender }}</option>
      </select>
      <label for="description">Description :</label> 
      <input placeholder="description" [formControl]="form.controls.description"/>
      <label for="file">Profile Picture :</label>
      <input type="file" [formControl]="form.controls.image_path" (change)="pickup_file($event)"/>  
      <label for="sterilized">Sterilized :</label> 
      <input placeholder="sterilized"  type="checkbox" [formControl]="form.controls.sterilized"/>
      <button [disabled]="form.invalid">Go</button>
    </form>
  `,
  styles: [`      
 
    .add-container {        
        display: grid; 
        grid-template-columns: 150px 1fr; 
        gap: 10px 20px;
        width: 440px;
        margin: 20px auto;
        padding: 20px 30px 20px 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
       }

       .image-container {
        display: flex; 
        align-items: center;
        margin-bottom: 20px; 
        justify-content: center;
        }

        .image-container img {
          width: 50px; 
          height: 50px;
          margin-right: 10px; 
        }

        .add-text {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

 
        label {
          text-align: right;
          font-weight: bold;
          align-self: center; 
        }


        input, select {
          width: 100%; 
          padding: 8px;
          font-size: 14px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        input[type="file"] {
          padding: 2px; 
        }

        input[type='checkbox'] {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
        
        button {
        grid-column: 2; 
        padding: 10px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }

      button[disabled] {
        background-color: #ccc;
        cursor: not-allowed;
      }

    
      input:focus, select:focus {
        border-color: #007BFF;
        outline: none;
      }

    `]
})

export class AddComponent {
  #profile_picture!: File;
  #petService = inject(PetService);
  #router = inject(Router);
  genderOptions = Object.values(Gender);

  // ngOnInit() {
  //   this.form.controls.gender.setValue(Gender.Female); // Manually set default
  //   console.log('Initial Gender Value:', this.form.controls.gender.value);
  // }

  form = inject(FormBuilder).nonNullable.group({
    '_id': ['', Validators.required],
    'name': ['', Validators.required],
    'kind': ['', Validators.required],
    'breed': ['', Validators.required],
    'age': [0, Validators.required],
    'gender': [ Gender.Female, Validators.required],
    'description': ['', Validators.required],
    'image_path': ['', Validators.required],
    'sterilized': [false, Validators.required]
  });

  pickup_file(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files!.length) {
      this.#profile_picture = input.files![0];
    }

  }

  go() {
  
    this.#petService.post_pet(this.form.value as Pet).subscribe(response => {
      if (response.success) {
        this.#router.navigate(['', 'pets']);
      }
    });
  }
}
