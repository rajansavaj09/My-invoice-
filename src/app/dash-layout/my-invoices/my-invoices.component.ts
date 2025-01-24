import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-invoices',
  // standalone: true,
  // imports: [],
  templateUrl: './my-invoices.component.html',
  styleUrl: './my-invoices.component.scss'
})

export class MyInvoicesComponent {
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.checkLoginStatus();
  }
}