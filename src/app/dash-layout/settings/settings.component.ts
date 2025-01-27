import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-settings',
  // standalone: true,
  // imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.checkLoginStatus();
  }
}
