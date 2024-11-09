import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Post, PostService } from '../post.service';
import { RouterModule } from '@angular/router';
import { BlogPostComponent } from '../blog-post/blog-post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,BlogPostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  @Input() post: Post | undefined;
  posts: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit() {
    // If you want to fetch posts within this component:
    // this.postService.getPosts().subscribe(posts => {
    //   this.post = posts[0]; // Assuming you want the first post
    // });
    this.postService.getPosts()
    .subscribe(posts => {
      this.posts = posts.slice(0, 3); // Take the first 3 posts
    });
}
}
