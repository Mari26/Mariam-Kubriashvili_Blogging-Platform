// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core'; // Removed importProvidersFrom as it's not needed for these Firebase providers
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// HttpClient imports
import { provideHttpClient, withFetch } from '@angular/common/http'; // Removed withInterceptorsFromDi for now unless specifically needed and configured

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // Firebase providers are used directly
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // HttpClient provider
    // Using withFetch() enables the fetch-based backend for HttpClient.
    // withInterceptorsFromDi() is for when you have DI-provided interceptors (legacy interceptors).
    // If you don't have legacy interceptors, you might not need withInterceptorsFromDi().
    // For modern functional interceptors, you'd use withInterceptors([...]).
    // Let's simplify it for now; you can add interceptor config if needed.
    provideHttpClient(withFetch())
  ]
};











// import { ApplicationConfig,importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { environment } from '../environments/environment';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// import { provideHttpClient,
//  withInterceptorsFromDi, 
//  withFetch } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom(
//       provideFirebaseApp(() => initializeApp(environment.firebase))
//     ),
//      importProvidersFrom(
//       provideAuth(() => getAuth())
//     ),
//     importProvidersFrom(
//       provideFirestore(() => getFirestore())
//     ),
//     provideHttpClient(withFetch(), 
//  withInterceptorsFromDi())  
//   ]
// };