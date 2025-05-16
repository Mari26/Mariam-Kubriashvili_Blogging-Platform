import { Routes } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
import {ContactComponent} from './contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'about', component: AboutComponent},
    { path: 'home', component: HomeComponent },
    // { path: 'post', component: PostComponent },
    // { path: 'post/:id', component: PostComponent },
    // { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'signup', component: SignupComponent, title: 'Sign Up' },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
    path: 'about',
    component: AboutComponent,
    canActivate: [authGuard], // <-- GUARD IS APPLIED HERE
    title: 'About Us'
  },
  {
    path: 'post',
    component: PostComponent,
    canActivate: [authGuard], // <-- GUARD IS APPLIED HERE
    title: 'Blog Posts'
  },
  {
    path: 'post/:id',
    component: PostComponent,
    canActivate: [authGuard], // <-- GUARD IS APPLIED HERE
    title: 'View Post'
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [authGuard], // <-- GUARD IS APPLIED HERE
    title: 'Contact Us'
  },


];
