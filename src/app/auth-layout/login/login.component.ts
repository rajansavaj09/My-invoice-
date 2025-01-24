import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthLayoutService } from '../../services/auth-layout.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  userData: any;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router,){}

  ngOnInit(): void {
    this.authService.checkLoginStatus();
    this.authService.isLoggedIn.subscribe((status) => (this.isLoggedIn = status));
    if (this.isLoggedIn) {
      this.router.navigate(['dash-layout']);
    }
  }

 loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,])
  })

  onLogin(): void {
    // Replace with actual login logic
    debugger
    this.authService.login('');
    this.router.navigate(['/app/documents']);
  } 
  onSubmit(){
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // let validUser = this.userData.find((data: any) => data.email === this.loginForm.value.email && data.password === this.loginForm.value.password);
    // if (validUser) {
    //   this.router.navigate(['auth-layout/registrar']);
    // } else {
    // }

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        alert('Login successful!');
        this.authService.login(user.email);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.router.navigate(['dash-layout']);
        // this.router.navigate(['auth-layout/registrar']);
      } else {
        alert('Invalid email or password.');
      }
    } else {
      alert('Please fill all required fields.');
    }
  }
}
