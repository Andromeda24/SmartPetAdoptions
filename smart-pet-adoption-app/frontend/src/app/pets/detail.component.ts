import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  imports: [],
  template: `
  <div class="detail-container">
    <h2>Pet Detail</h2>
    <p>Pet ID: {{ id }}</p>
  </div>
  `,
  styles: [`
      .detail-container {        
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
    `]
})
export class PetDetailComponent {
  id: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id'); // Get the pet ID from the URL
    console.log('Pet ID:', this.id);
  }
}
