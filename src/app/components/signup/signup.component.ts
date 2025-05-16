// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [],
//   templateUrl: './signup.component.html',
//   styleUrl: './signup.component.css'
// })
// export class SignupComponent {

// }
// src/app/components/signup/signup.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust path
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // You can create this file for styles
})
export class SignupComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  signupForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      // Clear error if passwords match or one field is empty (let other validators handle empty)
      if (confirmPassword?.hasError('mismatch')) {
         confirmPassword.setErrors(null);
      }
      return null;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.signupForm.invalid) {
      this.errorMessage = "Please fill in all fields correctly and ensure passwords match.";
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      await this.authService.signup(
        this.signupForm.value.email,
        this.signupForm.value.password
      );
      this.router.navigate(['/']); // Navigate to home or dashboard after successful signup
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'This email address is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        this.errorMessage = 'The email address is badly formatted.';
      } else if (error.code === 'auth/weak-password') {
        this.errorMessage = 'The password is too weak.';
      }
       else {
        this.errorMessage = 'An unexpected error occurred during signup. Please try again.';
      }
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
