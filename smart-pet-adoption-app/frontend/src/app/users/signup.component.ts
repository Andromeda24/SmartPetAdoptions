import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { Role } from './user.type';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,CommonModule],
  template: `  
    <form [formGroup]="form" (ngSubmit)="go()" class="signup-container">     
       <div class="image-container ">
        <img src="assets/images/login/signup.png" alt="Signup"/>
        <h2 class="signup-text">Sign up</h2>
      </div>
      <label></label>
      <label for="email">Email :</label>
      <input placeholder="email" [formControl]="form.controls.email"/>
      <label for="name">Name :</label>
      <input placeholder="name" [formControl]="form.controls.name"/>
      <label for="password">Password :</label>
      <input placeholder="password" type="password" [formControl]="form.controls.password"/>
      <label for="phone">Phone :</label>
      <input placeholder="phone" [formControl]="form.controls.phone"/>
      <label  for="address">Address :</label>
      <input placeholder="address" [formControl]="form.controls.address"/>  
      <label for="file">Profile Picture :</label>
      <input type="file" [formControl]="form.controls.file" (change)="pickup_file($event)"/>     
      <label for="role">Role :</label> 

      <select id="role" [formControl]="form.controls.role">
      <option *ngFor="let role of roleOptions" [value]="role">{{ role }}</option>
      </select>
      <button [disabled]="form.invalid">Sign up</button>
    </form>

  `,
  styles:[`
     
      .signup-container {        
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

        .signup-text {
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
export class SignupComponent {
  #profile_picture!: File;
  #users_service = inject(UsersService);
  #router = inject(Router);
  roleOptions = Object.values(Role);
  form = inject(FormBuilder).nonNullable.group({
    'email': ['mga@miu.edu', Validators.required],
    'name': ['Margret Ang', Validators.required],
    'password': ['123456', Validators.required],
    'phone': ['+16412332028', Validators.required],
    'address': ['1000 North 4th Street Fairfield, Iowa', Validators.required],
    'file': ['', Validators.required],
    'role': [Role.Seeker, Validators.required],
  });
  pickup_file(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files!.length) {
      this.#profile_picture = input.files![0];
    }

  }
  
  go() {
    const formData = new FormData();
    formData.append('email', this.form.controls.email.value);
    formData.append('name', this.form.controls.name.value);
    formData.append('password', this.form.controls.password.value);
    formData.append('profile_picture', this.#profile_picture);
    this.#users_service.singup(formData).subscribe(response => {
      console.log(response);
      this.#router.navigate(['', 'signin']);
    });
  }
}
