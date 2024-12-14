import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';  
import { MatListModule } from '@angular/material/list';     


@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule,MatMenuModule,MatButtonModule,MatIconModule,MatToolbarModule,MatSidenavModule,MatListModule],
  template: `
    <div class='header-container'>
  <mat-toolbar class="top-nav">
  <span class="logo">
    <img src="/assets/images/pets/shelter.png" alt="Pet Shelter Logo" height="40">
  </span>

  <!--Pet Management Navigation links -->
  <span class="nav-links">
    <a mat-button routerLink="/">Home</a>
    <a mat-button [routerLink]="['/about']">About</a>
    <a mat-button [routerLink]="['/adopt']">Adopt a Pet</a>
  <button mat-button [matMenuTriggerFor]="petMenu">
    Manage Pet Info
    <mat-icon>arrow_drop_down</mat-icon>
  </button>
  <mat-menu #petMenu="matMenu">
    <button mat-menu-item (click)="createPet()">Create Pet</button>
    <button mat-menu-item (click)="updatePet()">Update Pet</button>
    <button mat-menu-item (click)="deletePet()">Delete Pet</button>
  </mat-menu>
  </span>
</mat-toolbar>
    </div>
  `,
  styles: [`

      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #3f7cb4; 
        color : #fff;
      }

      .logo img {
        height: 50px; 
      }

      .top-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        background-color: #3f7cb4; 
        color : #fff;
      }

      .nav-links a {
        margin-left: 20px;
        color : #fff;
      }

      .logo img {
        height: 50px;
      }

       button mat-button {
          margin-left: 20px;
          background-color: green;  
          color : #fff;
       }

       .mat-mdc-menu-item {
        background-color : green;
        color : #fff;
       }

       .mat-menu-panel {
        background-color: #f0f0f0; 
        color : #fff;
        }

    `]
})
export class HeaderComponent {
  constructor(private router: Router) {}

  createPet(): void {
    // Logic for creating a pet, possibly navigating to a form or opening a dialog
    console.log('Navigate to Create Pet Form');
    this.router.navigate(['/create-pet']);
  }

  updatePet(): void {
    // Logic for updating pet info
    console.log('Navigate to Update Pet Form');
    this.router.navigate(['/update-pet']);
  }

  deletePet(): void {
    // Logic for deleting pet info
    console.log('Navigate to Delete Pet Form');
    this.router.navigate(['/delete-pet']);
  }
}
