import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetService } from './pet.service';
import { Pet} from './pet.type';

@Component({
  selector: 'app-ai-recommand',
  imports: [CommonModule,FormsModule],
  template: `
   <div class="recommad-container">   
   <input type="text" [(ngModel)]="searchQuery" placeholder="Search for pets...">
  <button (click)="onSearch()">Search</button>
  <div class="recommended-pets-container">
    <div *ngFor="let pet of recommendedPets" class="recommended-pet">
      <img [src]="pet.image_path" alt="Pet Image">
      <h2>{{ pet.name }}</h2>
      <p>Breed: {{ pet.breed }}</p>
      <p>Age: {{ pet.age }}</p>
      <p> Kind: {{ pet.kind }}</p>
    </div>
  </div>
   </div>
  `,
  styles: [`
   .recommad-container{        
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
export class AiRecommandComponent {
  searchQuery: string = '';
  recommendedPets: Pet[] = [];

  constructor(private petService: PetService) { }

  ngOnInit(): void {
  }

  onSearch(): void {
    // if (this.searchQuery.trim() !== '') {
    //   this.petService.getRecommendedPetsBySearchQuery(this.searchQuery).subscribe((pets: Pet[]) => {
    //     this.recommendedPets = pets;
    //   });
    // }
  }
}
