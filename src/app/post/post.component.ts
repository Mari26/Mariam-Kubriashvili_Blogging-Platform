import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Post, PostService } from '../post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../comments.service';
import { catchError, of } from 'rxjs';



@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  posts: Post[] = [];
  commentForm!: FormGroup;
 

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,
    private fb: FormBuilder,
    private commentService: CommentsService
  ){this.commentForm = this.fb.group({
    body: ['', Validators.required]
  });
 }

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
onSubmit() {
    if (this.commentForm.valid) {
      const newComment = {
        id: this.generateRandomId(),
        body: this.commentForm.value.body
      };

      this.commentService.createComment(newComment).pipe(
        catchError(error => {
          console.error('Error creating comment:', error);
          return of(null);
        })
      ).subscribe(() => {
        this.commentForm.reset();
      });
    } else {
      this.commentForm.markAllAsTouched();
    }
  }

  generateRandomId(): number {
    return Math.floor(Math.random() * 100000);
  }
  }
  



