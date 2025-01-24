import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeServiceService } from './services/theme-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TranslateModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translate: TranslateService,private themeService: ThemeServiceService) {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    this.translate.addLangs(['en','gu','hi']);
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);
    
  }

  
  
}
