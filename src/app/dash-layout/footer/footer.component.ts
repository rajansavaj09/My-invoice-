import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  // standalone: true,
  // imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
    isLoggedIn = false;
  
    constructor( private authService: AuthService) {}

    ngOnInit(): void {
      this.authService.isLoggedIn.subscribe((status) => (this.isLoggedIn = status));
    }
}
