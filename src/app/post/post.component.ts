import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Post, PostService } from '../post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  posts: Post[] = [];
  
  constructor(
    private route: ActivatedRoute, 
    private postService: PostService

  ) { }
  ngOnInit(){
    this.route.paramMap.subscribe(params => { 
      const id = params.get('id');
      if (id !== null) {
        this.postService.getPostById(id!).subscribe((post: Post | undefined) => {
          this.post = post;
        });
      } else {
        this.postService.getPosts().subscribe((posts: Post[]) => {
          this.posts = posts;
        });
      }
    });
  }

}
