import { Component,OnInit,inject} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, ROUTES } from '@angular/router';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
// import { PostService } from './post.service';
import { SharedModule } from './shared/shared.module';
import { Post, PostService } from './post.service';
import { routes } from './app.routes';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';
import { AuthService } from './services/auth.service'; // Adjust path if needed
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BlogPostListComponent,
    BlogPostComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    // PostService,
    SharedModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    
  ],
  providers: [
    PostService,
    { provide: ROUTES, useValue: routes }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
})
export class AppComponent implements OnInit{
  title = 'routing-app';
  authService: AuthService = inject(AuthService); // Using inject()

  currentUser$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  
  posts: Post[] = [];
  constructor(private postService: PostService) {
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
  ngOnInit() {
    this.postService.getPosts()
      .subscribe(
        (posts) => {
          this.posts = posts;
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
  }
 
 
}
