import { Routes } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
import {ContactComponent} from './contact/contact.component';
import{ BlogPostListComponent } from './blog-post-list/blog-post-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent},
    { path: 'home', component: HomeComponent },
    { path: 'post', component: PostComponent },
    { path: 'post/:id', component: PostComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }

];
