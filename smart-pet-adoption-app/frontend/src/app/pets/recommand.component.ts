import { Component, inject,OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { PetService } from './pet.service';
import { Pet } from './pet.model';

@Component({
  selector: 'app-recommandation',
  imports: [ReactiveFormsModule,CommonModule],
  template: `
    <div class="pet-recommad-container">   
      <header class="app-header">
        <h1>Smart Pet Adoption</h1>
        <div class="header-actions">
          <button class="icon-button">
            <i class="material-icons">favorite</i>
          </button>
          <button class="icon-button">
            <i class="material-icons">settings</i>
          </button>
        </div>
      </header>
    </div>
  `,
  styles: [`      
 
      .pet-recommad-container{        
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
          font-size: 20px;
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

export class RecommandComponent {
  #profile_picture!: File;
  #petService = inject(PetService);
  // #router = inject(Router);

  // petSearchForm: FormGroup;



}
