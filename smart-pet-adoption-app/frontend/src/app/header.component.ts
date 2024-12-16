import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {Role } from './users/user.type';
import { StateService } from './state.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  template: `
      <header class="header-container"> 
          <div class="logo"> 
            <img src="/assets/images/pets/shelter.png" alt="Smart Pet Adoption Logo"> 
          </div> 
          <nav> 
            <ul class="nav-list"> 
              <li><a routerLink="/">Home</a></li>   
              <li><a [routerLink]="['/about']">About</a></li>     
              <ng-container *ngIf="isAdmin()"> 
              <li class="dropdown"> 
                <div class="dropdown" [ngClass]="{'show': isDropdownOpen}"> 
                  <button class="btn dropdown-toggle" type="button" (click)="toggleDropdown()"> 
                    Manage Pet Info 
                  </button> 
                  <ul class="dropdown-menu" [ngClass]="{'show': isDropdownOpen}"> 
                    <li><a class="dropdown-item" [routerLink]="['/pets/add']">Add New Pet</a></li>        
                    <li><a class="dropdown-item" [routerLink]="['/pets/recommend']">Recommend</a></li> 
                  </ul> 
                </div> 
              </li> 
              </ng-container>
            
            </ul>   
        </nav> 
      </header>
  `,
  styles: [`
.header-container {
  background-color: #3f7cb4;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  padding: 10px;
  color: white;
  font-size : 14px;
}

.logo img {
  height: 50px;
}

.header-container nav .nav-list {
  display: flex;
  align-items: center; 
  list-style: none;
  padding: 5px; 
  margin: 4px;
}

.header-container nav .nav-list > li {
  position: relative;
  padding: 3px;
  margin: 4px;
  color: white;
}

a {
  color: white;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size : 14px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  min-width: 120px;
  background-color: #3f7cb4;
  border: 0px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: white;
  margin-top: 5px; 
}

.dropdown-menu.show {
  display: block;
  color: white;
}

.dropdown-menu li {
  padding: 8px 12px;  
}


.dropdown-item:hover{
  background-color : #45c7fd;
}

button {
    width: 110px; 
    grid-column: 2; 
    padding: 10px;
    background-color: #1d6da8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

    `]
})
export class HeaderComponent{
  #state_service = inject(StateService);
  #storedState = localStorage.getItem('SPA_APP_STATE');
  isDropdownOpen = false; 
  user_role :string | null = null; 
  admin_role = Role.Admin.toLocaleLowerCase();


  constructor(private router: Router) {
    console.log(' Header user role ****'+ this.user_role +  ' admin role *****'+this.admin_role)
  }


  createPet(): void { 
    console.log('Navigate to Create Pet Form');
    this.router.navigate(['/create-pet']);
  }

  updatePet(): void {
    console.log('Navigate to Update Pet Form');
    this.router.navigate(['/update-pet']);
  }

  deletePet(): void {
    console.log('Navigate to Delete Pet Form');
    this.router.navigate(['/delete-pet']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isAdmin(): boolean {
    if (this.#storedState) {
      const parsedState = JSON.parse(this.#storedState);
      const user_role = parsedState.role.toLocaleLowerCase().trim();
      console.log('User role stored state  haha *****'+user_role)
      return user_role === this.admin_role;
    }
    return false;
  }
}
