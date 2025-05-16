import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust path if needed
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet,
    RouterLink,
    RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = '';
  authService: AuthService = inject(AuthService); // Using inject()

  currentUser$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;

  constructor() {
    this.currentUser$ = this.authService.currentUser$;
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  async handleLogout(): Promise<void> {
    try {
      await this.authService.logout();
      // Navigation to login is handled within authService.logout()
    } catch (error) {
      console.error("Logout failed in AppComponent", error);
      // Optionally display an error to the user here
    }
  }
}
