import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { Token, User } from './user.type';
import { StateService } from '../state.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  template: `
  <div class="signin-container">
  <div class="user-ico-container">      
  <img src="assets/images/login/user.png" alt="User Avatar" class="avatar" />
      </div>
    <form [formGroup]="form" (ngSubmit)="go()">
      <input placeholder="email" class="input-field"  [formControl]="form.controls.email"/>
      <input placeholder="password" type="password"  class="input-field"  [formControl]="form.controls.password"/>
      <button [disabled]="form.invalid">Login</button>
      </form>
</div>
  `,
  styles: [`

    h2 {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
    }
    .signin-container {
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

    .signin-container  input {
      width: calc(100% - 20px);
      padding: 10px;
      margin-bottom: 15px; 
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
    }

    

    .input-field {
      width: calc(100% - 20px);
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .input-field:focus {
      border-color: #007BFF;
    }

    .signin-container button {
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

  .signin-container button:hover {
    background-color: #0056b3;
  }
    .submit-button:disabled {
      background-color: #ccc;
    }

    .submit-button:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .user-ico-container {
      margin-bottom: 20px;
      display: flex;
    }

    .user-ico-container img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    `]
})
export class SigninComponent {
  #users_service = inject(UsersService);
  #state = inject(StateService);
  #router = inject(Router);

  form = inject(FormBuilder).nonNullable.group({
    'email': ['mike@miu.edu', Validators.required],
    'password': ['123456', Validators.required],
  });

  go() {
    console.log('It is go from Sigin page')
    this.#router.navigate(['', 'pets']);
    // this.#users_service.signin(this.form.value as User).subscribe(response => {
    //   const decoded = jwtDecode(response.data.token) as Token;
    //   this.#state.$state.set({
    //     _id: decoded._id,
    //     name: decoded.name,
    //     email: decoded.email,
    //     jwt: response.data.token
    //   });
    //   this.#router.navigate(['', 'pets']);
    // });
  }
}
