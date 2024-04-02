import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-heart-switch',
  templateUrl: './heart-switch.component.html',
  styleUrl: './heart-switch.component.css'
})
export class HeartSwitchComponent {
  constructor(private themeService: ThemeService) { }

  toggleTheme(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.themeService.setTheme(checked ? 'dark' : 'light');
  }
}
