import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

interface Comment {
  id: number;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class CommentsService {
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.dbJsonUrl);
  }
  
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.dbJsonUrl}/${id}`);
  }
  private dbJsonUrl = 'http://localhost:3000/comments'; 

  constructor(private http: HttpClient) { }

  getCommentsForPost(postId: number): Observable<Comment[]> {
    const url = `${this.dbJsonUrl}?postId=${postId}`;
    return this.http.get<Comment[]>(url);
  }
  updateComment(commentId: number, updatedComment: Comment): Observable<Comment> {
    const url = `${this.dbJsonUrl}/${commentId}`;
    return this.http.put<Comment>(url, updatedComment).pipe(
      tap((updated) => {

        Object.assign(updatedComment, updated); 
      }),
      catchError(this.handleError)
    );

  // updateComment(commentId: number, updatedComment: Comment): Observable<Comment> {
  //   const url = `${this.dbJsonUrl}/${commentId}`;
  //   return this.http.put<Comment>(url, updatedComment).pipe(
  //     catchError(this.handleError)
  //   );
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.dbJsonUrl, comment).pipe(
      catchError(error => {
        console.error('Error adding comment:', error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            alert('try again')
          } else if (error.status === 500) {
            alert('bad internet conection,try alter')
          } 
          
        }
        return throwError(() => error); 
      })
    );
    
  }

  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError(() => new Error('Failed to update comment'));
  }

}