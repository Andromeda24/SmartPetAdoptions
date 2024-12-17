import { Component,inject,signal } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatPaginator  } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; 
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { PetTestService } from './pet.service.test';
import { PetService } from './pet.service';
import { Pet} from './pet.type';
import { Kind } from './pet.type';
import { AgeLevel } from './pet.type';

@Component({
  selector: 'app-recommand',
  standalone : true,
  imports: [CommonModule,MatTableModule,MatSort,MatPaginator,RouterModule,FormsModule, ReactiveFormsModule,MatPaginatorModule],
  template: `
   <div class="recommad-container">  
   <form [formGroup]="form">
   <div class="container">
    <div class="row">      
      <label for="kind" class="col-sm mt-2">Kind of pet :</label>
      <select id="kind" [formControl]="form.controls.kind" class="col-sm">
      <option *ngFor="let kind of kindOptions" [value]="kind">{{ kind }}</option>
      </select>
      <label for="age" class="col-sm mt-2">Age :</label>
      <select id="age" [formControl]="form.controls.age" class="col-sm">
      <option *ngFor="let age of ageOptions" [value]="age">{{ age }}</option>
      </select>
      <input type='textarea' placeholder="Your Preferences ..." [formControl]="form.controls.preference" class="col-sm-4"/>
      <button class="col-sm" (click)="onSearch()"> Ask AI </button>
      </div>
    </div>
    </form>
</div>
    <div class="list-container">
      <div class="title-container">      
      <h3>Best Match Pet List ...</h3>
      </div>
      <table mat-table [dataSource]="petsDataSource" matSort>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
          <td mat-cell *matCellDef="let pet"> <a [routerLink]="['/pets', pet._id]">{{ pet.name }}  {{pet.breed}}</a> </td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef> Description </th>
          <td mat-cell *matCellDef="let pet"> {{ pet.description }} </td>
        </ng-container>
        <ng-container matColumnDef="breed">
          <th mat-header-cell *matHeaderCellDef> Breed </th>
          <td mat-cell *matCellDef="let pet"> {{ pet.breed }} </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns" mat-sort-header></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <mat-paginator [length]="petsDataSource.data.length" [pageSize]="3"></mat-paginator> 
  </div>

  `,
  styles: [`
   .recommad-container{            
        width: 60%;
        margin: 20px auto;
        padding: 20px 30px 20px 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1);     
       }

       .list-container{            
        width: 60%;
        margin: 20px auto;
        padding: 20px 30px 20px 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1);     
       }

    `]
})

export class RecommandComponent {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  searchQuery: string = '';
  recommendedPets: Pet[] = [];
  kindOptions = Object.values(Kind);
  ageOptions = Object.values(AgeLevel);
  form_error : string | null = null;
  #petService = inject(PetService);
  #petTestService = inject(PetTestService);
  pets = signal<Pet[]>([]);
  petsDataSource = new MatTableDataSource<Pet>([]);
  displayedColumns: string[] = ['name', 'description','breed'];

  constructor(private petService: PetService) { 
    this.loadPets();
  }
    form = inject(FormBuilder).nonNullable.group({
      '_id': ['', Validators.required],     
      'kind': [Kind.Dog, Validators.required],     
      'age': [AgeLevel.Junior, [Validators.required,Validators.pattern(/^\d+$/)]],    
      'preference': ['', Validators.required],     
    });

  ngOnInit(): void {
  }

  loadPets(): void {
    this.#petTestService.get_pets().subscribe(response => {
      console.log("Pet Test Service " + JSON.stringify(response.data))
      if (response.success) {
        this.pets.set(response.data);
        this.petsDataSource.data = response.data;
      }
    });  
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.petsDataSource.paginator = this.paginator;
    } else {
      console.warn('Paginator not found!');
    }

    if (this.sort) {
      this.petsDataSource.sort = this.sort;
    } else {
      console.warn('Sort not found!');
    }
  }
  
  onSearch(): void {
    // if (this.searchQuery.trim() !== '') {
    //   this.petService.getRecommendedPetsBySearchQuery(this.searchQuery).subscribe((pets: Pet[]) => {
    //     this.recommendedPets = pets;
    //   });
    // }
  }
}
