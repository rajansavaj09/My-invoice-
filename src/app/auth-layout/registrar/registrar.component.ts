import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLayoutService } from '../../services/auth-layout.service';

@Component({
  selector: 'app-registrar',
  // standalone: true,
  // imports: [],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent {
constructor( private router: Router, private authService:AuthLayoutService ) {}

  ngOnInit() {
  }
  registrarForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl(''),
    password: new FormControl('', [Validators.required,])
  })
  
  onSubmit(){
  //   if (this.registrarForm.invalid) {
  //     return;
  //   }
  //   let data = this.authService.createUser(this.registrarForm.value).subscribe(() => {
  //     if(data){
  //       this.router.navigate(['auth-layout/login']);
  //     }else{
  //     }
  //   })
  // }
  if (this.registrarForm.valid) {
    const formData = this.registrarForm.value;

    // Save user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['auth-layout/login']);
    alert('Registration successful! You can now log in.');
  } else {
    alert('Please fill all required fields.');
  }
}
}
