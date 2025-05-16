// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider, // Optional: For Google Sign-In
  signInWithPopup     // Optional: For Google Sign-In
} from '@angular/fire/auth'; // Correct imports for Firebase v9+ modular API
import { Observable, BehaviorSubject, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth); // Inject Auth service using inject()
  private router: Router = inject(Router); // Inject Router

  // BehaviorSubject to hold the current user state.
  // null means no user is logged in.
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  // Expose the current user as an Observable.
  // Components can subscribe to this to react to login/logout events.
  currentUser$ = this.currentUserSubject.asObservable();

  // Observable that emits true if a user is logged in, false otherwise.
  isLoggedIn$: Observable<boolean>;

  // Observable that emits true if no user is logged in, false otherwise.
  isLoggedOut$: Observable<boolean>;

  constructor() {
    // Listen to Firebase's authentication state changes.
    // This will fire when a user logs in, logs out, or when the page loads
    // and Firebase SDK initializes the auth state.
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user); // Update our BehaviorSubject
    });

    // Create isLoggedIn$ and isLoggedOut$ observables based on currentUser$.
    this.isLoggedIn$ = new Observable(observer => {
      onAuthStateChanged(this.auth, user => observer.next(!!user));
    });
    this.isLoggedOut$ = new Observable(observer => {
      onAuthStateChanged(this.auth, user => observer.next(!user));
    });
  }

  /**
   * Logs in a user with email and password.
   * @param email User's email
   * @param password User's password
   * @returns A Promise that resolves with the UserCredential on success.
   */
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      // User is automatically updated by onAuthStateChanged
      console.log('Logged in successfully!', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Rethrow to allow component to handle it (e.g., display error message)
    }
  }

  /**
   * Signs up a new user with email and password.
   * @param email New user's email
   * @param password New user's password
   * @returns A Promise that resolves with the UserCredential on success.
   */
  async signup(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      // User is automatically updated by onAuthStateChanged
      // You might want to save additional user info to Firestore here (e.g., display name)
      console.log('Signed up successfully!', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error; // Rethrow for component handling
    }
  }

  /**
   * Logs out the current user.
   * @returns A Promise that resolves when logout is complete.
   */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      // User is automatically updated by onAuthStateChanged to null
      this.router.navigate(['/login']); // Navigate to login page after logout
      console.log('Logged out successfully!');
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  /**
   * Gets the current authenticated user object.
   * @returns The current User object or null if not logged in.
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  /**
   * Gets the Firebase ID token for the current user.
   * This token can be sent to a backend server to authenticate the user.
   * @param forceRefresh Force refresh the token.
   * @returns A Promise that resolves with the ID token string or null.
   */
  async getIdToken(forceRefresh: boolean = false): Promise<string | null> {
    const user = this.getCurrentUser();
    if (user) {
      try {
        return await user.getIdToken(forceRefresh);
      } catch (error) {
        console.error("Error getting ID token:", error);
        return null;
      }
    }
    return null;
  }

  // Optional: Google Sign-In
  async googleSignIn(): Promise<User | null> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('Google Sign-In successful!', user);
      return user;
    } catch (error) {
      console.error("Google Sign-In error:", error);
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      throw error;
    }
  }
}
