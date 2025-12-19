import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode = signal<boolean>(false);

  constructor() {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        this.darkMode.set(savedTheme === 'dark');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.darkMode.set(prefersDark);
    }

    // Apply theme whenever it changes
    effect(() => {
      const isDark = this.darkMode();
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        document.documentElement.classList.add('dark-mode'); 
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.setAttribute('data-bs-theme', 'light');
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  toggleTheme() {
    this.darkMode.update(curr => !curr);
  }
}
