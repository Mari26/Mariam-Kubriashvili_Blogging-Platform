// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

// }
// src/app/components/login/login.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink for navigation
import { AuthService } from '../../services/auth.service'; // Adjust path as needed
import { CommonModule } from '@angular/common'; // For @if, @for, async pipe etc.

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, // Important for built-in directives
    ReactiveFormsModule, // For using [formGroup] and formControlName
    RouterLink // For <a routerLink="...">
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // You can create this file for styles
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.errorMessage = "Please fill in all fields correctly.";
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to show errors
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.router.navigate(['/']); // Navigate to home or dashboard after successful login
    } catch (error: any) {
      // Handle specific Firebase error codes for better messages
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        this.errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        this.errorMessage = 'The email address is badly formatted.';
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again.';
      }
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async onGoogleSignIn(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    try {
      await this.authService.googleSignIn();
      this.router.navigate(['/']); // Navigate to home or dashboard
    } catch (error) {
      this.errorMessage = 'Google Sign-In failed. Please try again.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
