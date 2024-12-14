import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetTestService } from './pet.service.test';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Pet } from './pet.model'

@Component({
  selector: 'app-detail',
  imports: [MatCardModule],
  template: `
  <!-- <div class="detail-container">
    <h2>Pet Detail</h2>
    <p>Pet ID: {{ pet?._id }}</p>
    <p>Name: {{ pet?.name }}</p>
    <p>Description: {{ pet?.description }}</p>
  </div> -->
  <div class="detail-container">
  <mat-card class="pet-card">
  <mat-card-header>
  <div mat-card-avatar></div>     
    <mat-card-title> Name : {{ pet?.name }}</mat-card-title>
    <mat-card-title>ID : {{ pet?._id }}</mat-card-title>
  </mat-card-header>
  <img mat-card-image src={{pet?.image_path}} alt="Photo of Pet" class ="small-image">
    <mat-card-content>
      <p><strong>Description:</strong> {{ pet?.description }}</p>
      <p><strong>Kind:</strong> {{ pet?.kind }}</p>
      <p><strong>Breed:</strong> {{ pet?.breed }}</p>
      <p><strong>Age:</strong> {{ pet?.age }}</p>
      <p><strong>Gender:</strong> {{ pet?.gender }}</p>
      <p><strong>Sterilized:</strong> {{ pet?.sterilized }}</p>
    </mat-card-content>
    <mat-card-actions>
    <button mat-button (click)="goBack()">Back</button> 
  </mat-card-actions>
    </mat-card>
  </div>
    
  `,
  styles: [`
      .detail-container {        
      width: 100%;
      max-width: 70%;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1);
      text-align: left;
      flex-direction: column;
      align-items: center; 
       } 

       .small-image {
        width: 200px;
        height: 200px;
        object-fit: cover; 
      }

       .pet-header-image {       
        background-size: cover;
        }
    `]
})
export class PetDetailComponent {
  id: string | null = null;  
  pet: Pet | null = null;
  constructor(private route: ActivatedRoute,private petTestService: PetTestService, private location: Location){ }

  ngOnInit() {
    // Get the pet ID from the route parameters
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {    
      this.petTestService.get_pet(this.id).subscribe(
        response => {
          if (response.success) {
            this.pet = response.data;  
        
          } else {
            this.pet = null;  
          
          }
        },
        (error) => {
          console.error('Error fetching pet details', error);        
        }
      );
    }
  }

  goBack(): void {
    this.location.back();  
  }
}

