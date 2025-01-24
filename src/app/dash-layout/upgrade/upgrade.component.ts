import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-upgrade',
  // standalone: true,
  // imports: [],
  templateUrl:'./upgrade.component.html',
  styleUrl:'./upgrade.component.scss'
})
export class UpgradeComponent {
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.checkLoginStatus();
  }
}
