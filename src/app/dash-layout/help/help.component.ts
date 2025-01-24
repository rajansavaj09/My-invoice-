import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-help',
  // standalone: true,
  // imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.checkLoginStatus();
  }
}
