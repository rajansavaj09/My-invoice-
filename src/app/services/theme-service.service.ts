import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceService {
  private theme: string = 'light'; // Default theme

  constructor() {
    // Load saved theme from localStorage (if available)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme;
      this.applyTheme();
    }
  }

  getTheme(): string {
    return this.theme;
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(this.theme);
  }
}

