import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

  formGroup: FormGroup | undefined;

  ngOnInit() {
    this.formGroup = new FormGroup({
      text: new FormControl<string | null>(null)
    });
  }
}
