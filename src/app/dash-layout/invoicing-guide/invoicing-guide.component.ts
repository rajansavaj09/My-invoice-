import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-invoicing-guide',
  // standalone: true,
  // imports: [],
  templateUrl: './invoicing-guide.component.html',
  styleUrl: './invoicing-guide.component.scss'
})
export class InvoicingGuideComponent {
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.checkLoginStatus();
  }
}
