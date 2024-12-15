import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { initial_state, StateService } from './state.service';
import { HeaderComponent } from './header.component'
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HeaderComponent, FooterComponent],
  template: `  
    <app-header></app-header>
    <!-- <p> {{state_service.isLoggedIn()}}</p> -->
    <router-outlet />
    @if(!state_service.isLoggedIn()){
      <a [routerLink]="['','signin']"></a>
      <!-- <a [routerLink]="['','signup']">Signup</a> -->
    }@else {     
      <app-footer>       
      </app-footer>
    }    
  `,
  styles: [`
      a{margin-right: 10px}    
  
    `],
})
export class AppComponent {
  title = 'Smart Pet Adoption App';
  state_service = inject(StateService);
  #router = inject(Router);

  // signout() {
  //   this.state_service.$state.set(initial_state);
  //   this.#router.navigate(['', 'signin']);
  // }

}
