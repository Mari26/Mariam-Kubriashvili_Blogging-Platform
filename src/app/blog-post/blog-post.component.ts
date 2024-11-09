import { Component, Input, OnInit,} from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { BlogService } from '../blog.service';



@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})


export class BlogPostComponent implements OnInit{
  // @Input() posts: Post[] = [];
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
