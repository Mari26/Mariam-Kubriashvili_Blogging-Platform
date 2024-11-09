import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogPostComponent } from '../blog-post/blog-post.component';
import { Post, PostService } from '../post.service';

@Component({
  selector: 'app-blog-post-list',
  standalone: true,
  imports: [CommonModule,RouterModule,BlogPostComponent ],
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.css'
})
export class BlogPostListComponent implements OnInit{
  posts: Post[] = []; 

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe({
      next: (posts) => { 
        this.posts = posts; // Assign the posts here
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
        // Handle the error (e.g., display an error message)
      }
    });
  
  }
}