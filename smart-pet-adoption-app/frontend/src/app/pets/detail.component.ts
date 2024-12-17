import { Component,inject,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetTestService } from './pet.service.test';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PetService } from './pet.service';
import { Pet } from './pet.type'
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-detail',
  imports: [MatCardModule],
  template: `
  <div class="detail-container">
  <div class="container">
    <div class="row">  
      <mat-card class="col-sm pet-card tall-card" >
      <mat-card-header>    
        <mat-card-title> Pet Profile </mat-card-title>    
      </mat-card-header>
        <mat-card-content>       
          <p><strong>Name:</strong> {{ pet?.name }}</p>
          <p><strong>Description:</strong> {{ pet?.description }}</p>
          <p><strong>Kind:</strong> {{ pet?.kind }}</p>
          <p><strong>Breed:</strong> {{ pet?.breed }}</p>
          <p><strong>Age:</strong> {{ pet?.age }}</p>
          <p><strong>Gender:</strong> {{ pet?.gender }}</p>
          <p><strong>Sterilized:</strong> {{ pet?.sterilized }}</p>
        </mat-card-content>       
      </mat-card>
      <div class="image-container col-sm">
          <!-- <img src={{pet?.image_path}} alt="Photo of Pet" 9fd3289207c246965f465aba77cbcd33> -->
          <!-- <img src="http://localhost:3000/pictures/828bf02be1b1b28dba4dd2a83739a4b6" alt="Photo of Pet"> -->
          <img src={{imageUrl}} alt="Photo of Pet">
          
        </div>
      </div>
   
  </div>
</div>
  `,
  styles: [`
      .detail-container {        
        width: 100%;
        max-width: 70%;
        max-height : 70%;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1);    
    
       } 

       .image-container{
            overflow : hidden;      
            width : 500px !important;
            height : 600px !important;           
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tall-card {
        height: 600px; /* adjust the height to your liking */
       }

     `]
})
export class PetDetailComponent {
  id: string | null = null;  
 // pets = signal<Pet[]>([]);
  pet: Pet | null = null;
  #petService = inject(PetService);
  imageUrl :string | null = null;
 // imageUrl = environment.SERVER_URL+"/pictures" +"/"+"9fd3289207c246965f465aba77cbcd33";
  constructor(private route: ActivatedRoute,private petService: PetTestService){ 

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {    
      this.#petService.get_pets().subscribe(
        response => {
          if (response.success) {       
           this.pet = response.data.find(p => p._id === this.id) as Pet ?? null;          
         //  this.imageUrl=  environment.SERVER_URL+this.pet.image_path;
            console.log('Image path' + this.imageUrl)
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

  ngOnInit() {

  }

}

