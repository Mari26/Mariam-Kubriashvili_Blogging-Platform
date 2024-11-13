import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Post, PostService } from '../post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../comments.service';
import { catchError, Observable, of, switchMap } from 'rxjs';

interface Comment {
  id: number;
  body: string;
}

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
  isEditing: boolean = false;;
  commentIdToEdit:  number | null = null;
  comments: Comment[] = [];

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
        this.postService.getPostById(id!).pipe(
          switchMap((post: Post | undefined) => {
            this.post = post;
            // Fetch comments only after the post is loaded
            return this.commentService.getCommentsForPost(parseInt(id!, 10)); 
          }),
          catchError(error => {
            console.error('Error loading post or comments:', error);
            return of(null);
          })
        ).subscribe(comments => {
          if (comments) {
            this.comments = comments;
          }
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
    let commentId: number;

    if (this.isEditing && this.commentIdToEdit !== null) {
      commentId = this.commentIdToEdit;
    } else {
      commentId = this.generateRandomId();
    }

    const newComment: Comment = { 
      id: commentId, 
      body: this.commentForm.value.body
    };

    let request$: Observable<any>;

    if (this.isEditing) {
      request$ = this.commentService.updateComment(commentId, newComment);
    } else {
      request$ = this.commentService.createComment(newComment); 
    }

    request$.pipe(
      catchError(error => {
        console.error('Error:', error);
        return of(null);
      })
    ).subscribe(response => {  
      console.log('Response:', response); 
      this.commentForm.reset();
      alert('Comment created successfully!'); 
      this.isEditing = false;
      this.commentIdToEdit = null;
    }); 
  } else {
    this.commentForm.markAllAsTouched();
  }
}

generateRandomId(): number {
  return Math.floor(Math.random() * 100000); 
}
  editComment(comment: Comment) { 
    this.isEditing = true;
    this.commentIdToEdit = comment.id;
    this.commentForm.patchValue({ body: comment.body });
  }
  cancelEdit() {
    this.isEditing = false;
    this.commentIdToEdit = null;
    this.commentForm.reset(); 
  }
}


