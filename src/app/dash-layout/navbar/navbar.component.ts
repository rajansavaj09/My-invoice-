import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeServiceService } from '../../services/theme-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  // standalone: true,
  // imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean = false;
  email: string | null = null;
  firstName:string | null = null ;
  lastName:string | null = null;
  // username

  constructor(private translate: TranslateService,public themeService: ThemeServiceService, private authService: AuthService) {
  }
  ngOnInit(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users) {
      this.firstName = users.firstName || null;
      this.lastName = users.lastName || null;
      this.email = users.email || null;
    } else {
      console.log('No user data found in localStorage');
    }
    this.authService.isLoggedIn.subscribe((status) => (this.isLoggedIn = status));
    this.authService.email$.subscribe((email) => (this.email = email));
  }

  logout(): void {
    this.authService.logout();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('selectedLanguage', lang);
  }
  // toggleTheme(): void {
  //   const newTheme = this.themeService.getTheme() === 'light' ? 'dark' : 'light';
  //   this.themeService.setTheme(newTheme);
  // }
  // toggleTheme(): void {
  //   const currentTheme = this.themeService.getTheme();
  //   const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  //   this.themeService.setTheme(newTheme);
  //   document.body.classList.toggle('dark-theme', newTheme === 'dark');
  //   document.body.classList.toggle('light-theme', newTheme === 'light');
  // }
  // toggleTheme(): void {
  //   const currentTheme = this.themeService.getTheme();
  //   console.log('Current Theme:', currentTheme);
  //   const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  //   this.themeService.setTheme(newTheme);
  //   console.log('New Theme:', newTheme);
  //   document.body.classList.toggle('dark-theme', newTheme === 'dark');
  //   document.body.classList.toggle('light-theme', newTheme === 'light');
  // }
  
  // toggleTheme(): void {
  //   this.themeService.toggleTheme();
  // }
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    document.documentElement.setAttribute(
      'data-bs-theme',
      currentTheme === 'light' ? 'dark' : 'light'
    );
  }
  

}
