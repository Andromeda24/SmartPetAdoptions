import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetService } from './pet.service';
import { Pet } from './pet.type';
import { Gender } from './pet.type';
import { Kind } from './pet.type';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
     <form [formGroup]="form" (ngSubmit)="update()" class="update-container">
       <div class="image-container">
        <img src="assets/images/pets/updatePet.png" alt="Update Pet"/>
        <h2 class="h2-text">Update Pet</h2>
      </div>
      <label></label>
      <label for="id">ID :</label>
      <input placeholder="id" [formControl]="form.controls._id" readonly/>
      <label for="name">Name :</label>
      <input placeholder="name" [formControl]="form.controls.name"/>
      <label for="kind">Kind :</label>
      <select id="kind" [formControl]="form.controls.kind">
      <option *ngFor="let kind of kindOptions.slice(1)" [value]="kind">{{ kind }}</option>
      </select>
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
      <button [disabled]="form.invalid">Update Pet</button>
      <div class="error" style="grid-column: 2;">         
            {{this.form_error}}
       </div>
    </form>
  `,
  styles: [`      
      .update-container {        
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

    .h2-text {
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
        width: 40%; 
        padding: 8px;
        font-size: 14px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    input[type="file"] {
        padding: 2px; 
        width: 40%; 
    }

    input[type='checkbox'] {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
        
    button {
        width: 30%; 
        grid-column: 2; 
        padding: 10px;
        background-color: #28a745;
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
        border-color: #28a745;
        outline: none;
    }
  `]
})
export class UpdateComponent implements OnInit {
  #profile_picture!: File;
  #petService = inject(PetService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  kindOptions = Object.values(Kind);
  genderOptions = Object.values(Gender);
  form_error : string | null = null;

  form = inject(FormBuilder).nonNullable.group({
    '_id': ['', Validators.required],
    'name': ['', Validators.required],
    'kind': [Kind.Dog, Validators.required],
    'breed': ['', Validators.required],
    'age': [0, [Validators.required,Validators.pattern(/^\d+$/)]],
    'gender': ['', Validators.required],
    'description': ['', Validators.required],
    'image_path': ['', Validators.required],
    'sterilized': [false, Validators.required]
  });

  ngOnInit() {

  
      this.form.valueChanges.subscribe(() => {
        this.form_error = null;   
        if (this.form.controls.name.errors?.['required']) {
          this.form_error = 'Name is required.';
          return; 
        }
  
        if (this.form.controls.kind.errors?.['required']) {
          this.form_error = 'Kind is required.';
          return; 
        }  
  
        if (this.form.controls.breed.errors?.['required']) {
          this.form_error = 'Breed is required.';
          return; 
        }    
  
        if (this.form.controls.age.errors?.['required']) {
          this.form_error = 'Age is required.';
          return; 
        }

        if (this.form.controls.age.errors?.['pattern']) {
          this.form_error  = `Invalid format for age.`;
          return; 
        }
  
        if (this.form.controls.gender.errors?.['required']) {
          this.form_error = 'Gender is required.';
          return; 
        }
  
        if (this.form.controls.description.errors?.['required']) {
          this.form_error = 'Description is required.';
          return; 
        }    
    
        if (this.form.controls.sterilized.errors?.['required']) {
          this.form_error = 'Sterilized is required.';
          return; 
        }   
  
      });
    

    const petId = this.#route.snapshot.paramMap.get('id'); 
    console.log('Update pet Id '+petId)
    if (petId) {
      this.#petService.get_pet(petId).subscribe(response =>{
        console.log('response Update '+response.data)
        if (response.success) {
          this.#router.navigate(['', 'pets']); 
        }
      });
    }
  }

  pickup_file(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files!.length) {
      this.#profile_picture = input.files![0];
    }
  }

  update() {
    console.log('Updating Pet:', this.form.value);
    this.#petService.put_pet(this.form.value as Pet).subscribe(response => {
      if (response.success) {
        alert("Pet has been updated successfully.")
        this.#router.navigate(['', 'pets']); 
      }
    });
  }
}
