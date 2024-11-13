import { Component, Input, OnInit,} from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})


export class BlogPostComponent implements OnInit{
  @Input() post: Post | undefined;
  posts: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts()
    .subscribe(posts => {
      this.posts = posts.slice(0, 3); // Take the first 3 posts,and add it on display
    });
  
  }
  currentDateAndTime = new Date()
}
