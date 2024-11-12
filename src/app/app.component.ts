import { Component,OnInit} from '@angular/core';
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
  posts: Post[] = [];
  constructor(private postService: PostService) {}
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
