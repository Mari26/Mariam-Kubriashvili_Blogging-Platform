// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust path
import { map, take, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1), // Take the first emission and complete
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true; // User is logged in, allow access
      } else {
        // User is not logged in, redirect to login page
        // Pass the attempted URL as a query parameter for redirection after login
        return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      }
    })
  );
};