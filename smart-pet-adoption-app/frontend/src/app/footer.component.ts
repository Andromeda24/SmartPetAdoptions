import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { initial_state, StateService } from './state.service';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
<footer class="footer-container">     
  @if(state_service.isLoggedIn()){
  <button (click)="signout()">Log out</button>   
  }   
</footer>
  `,
  styles: [`
      .footer-container {
      background-color: #fff;
      display: flex;
      justify-content: right;
      align-items: center;
      padding: 10px;
      color: white;
      height: 10vh;      
    }
 
    `]
})
export class FooterComponent { 
  state_service = inject(StateService);
  #router = inject(Router);
    constructor(private router: Router) {
 
    }
    
    signout() {     
      localStorage.clear();
      this.state_service.$state.set(initial_state);
      this.#router.navigate(['', 'home']);
    }
  
}